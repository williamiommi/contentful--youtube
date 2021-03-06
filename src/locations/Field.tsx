import React, { useEffect } from 'react';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import useYtApi from '../lib/hooks/useYtApi';
import useAutoResizer from '../lib/hooks/useAutoResizer';
import Tile from '../components/Tile';
import { Button } from '@contentful/f36-components';
import useHandleError from '../lib/hooks/useHandleError';

const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  const { error, getVideosInfo, videos, setVideos } = useYtApi(sdk.parameters.installation.apiKey);
  useHandleError(error);
  useAutoResizer();

  const clearField = async () => {
    await sdk.field.removeValue();
    setVideos(undefined);
    sdk.entry.save();
  };

  const setVideo = (id: string) => {
    sdk.field.setValue(id);
    sdk.entry.save();
  };

  const selectVideos = async () => {
    const res = await sdk.dialogs.openCurrent({
      position: 'top',
      minHeight: '75vh',
      width: 'fullWidth',
    });
    if (res.id) {
      setVideo(res.id);
    }
  };

  useEffect(() => {
    const unsubscribe = sdk.field.onValueChanged(() => {
      if (sdk.field.getValue()) getVideosInfo(sdk.field.getValue());
    });
    return () => {
      unsubscribe();
    };
  }, [sdk.field, getVideosInfo]);

  return (
    <>
      {videos && (
        <div className="flex flex-col space-y-3">
          {videos.map((video) => (
            <Tile
              key={video.id}
              videoId={video.id}
              title={video.snippet.title}
              description={video.snippet.description}
              embedHtml={video.player.embedHtml}
              viewCount={video.statistics.viewCount}
              commentCount={video.statistics.commentCount}
              likeCount={video.statistics.likeCount}
              publishedAt={video.snippet.publishedAt}
              channelThumbnail={video.channelInfo?.snippet.thumbnails.default?.url}
              channelCustomUrl={video.channelInfo?.snippet.customUrl}
              channelTitle={video.channelInfo?.snippet.title}
            />
          ))}
        </div>
      )}
      {videos && <div className="my-3 h-[1px] bg-gray-600"></div>}
      <section className="space-x-2">
        <Button variant="primary" className="font-bold" onClick={selectVideos}>
          {videos ? 'CHANGE VIDEO' : 'ADD VIDEO'}
        </Button>
        {videos && (
          <Button variant="negative" className="font-bold" onClick={clearField}>
            CLEAR FIELD
          </Button>
        )}
      </section>
    </>
  );
};

export default Field;
