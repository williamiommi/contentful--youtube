import React, { useEffect, useState } from 'react';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import useYtApi from '../lib/hooks/useYtApi';
import useAutoResizer from '../lib/hooks/useAutoResizer';
import Tile from '../components/Tile';

const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  const [fieldValue, setFieldValue] = useState(sdk.field.getValue());
  const { getVideosInfo, videos, setVideos } = useYtApi(sdk.parameters.installation.apiKey);
  useAutoResizer();

  const clearField = async () => {
    await sdk.field.removeValue();
    setFieldValue(undefined);
    setVideos(undefined);
    sdk.entry.save();
  };

  const setVideo = () => {
    sdk.field.setValue(['Ipv_LWcdfC0']);
    setFieldValue(['Ipv_LWcdfC0']);
    sdk.entry.save();
  };

  useEffect(() => {
    if (fieldValue) {
      getVideosInfo(fieldValue);
    }
  }, [fieldValue, getVideosInfo]);

  return (
    <>
      value: {sdk.field.getValue()}
      <button onClick={setVideo}>set video id</button>
      <button onClick={clearField}>clear</button>
      {videos?.map((video) => (
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
    </>
  );
};

export default Field;
