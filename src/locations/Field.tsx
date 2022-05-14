import React, { useEffect, useState } from 'react';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import useYtApi from '../lib/hooks/useYtApi';
import useAutoResizer from '../lib/hooks/useAutoResizer';
import Tile from '../components/Tile';

const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  const [fieldValue, setFieldValue] = useState(sdk.field.getValue());
  const { getVideosInfo, videos } = useYtApi(sdk.parameters.installation.apiKey);
  useAutoResizer();

  // const clearField = async () => {
  //   await sdk.field.removeValue();
  //   setFieldValue(undefined);
  //   setVideos(undefined);
  //   sdk.entry.save();
  // };

  const setVideo = (id: string) => {
    // Ipv_LWcdfC0
    sdk.field.setValue([id]);
    setFieldValue([id]);
    sdk.entry.save();
  };

  const openDialog = async () => {
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
    if (fieldValue) {
      getVideosInfo(fieldValue);
    }
  }, [fieldValue, getVideosInfo]);

  return (
    <>
      {videos &&
        videos.map((video) => (
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
      <button
        className="flex items-center justify-center bg-sky-900 hover:bg-sky-700 text-white p-4"
        onClick={openDialog}
      >
        Open Dialog
      </button>
    </>
  );
};

export default Field;
