import React, { useEffect, useState } from 'react';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import useYtApi from '../lib/hooks/useYtApi';
import useAutoResizer from '../lib/hooks/useAutoResizer';
import Tile from '../components/Tile';

const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  const [fieldValue, setFieldValue] = useState(sdk.field.getValue());
  // const { getVideosInfo, videos, setVideos } = useYtApi(sdk.parameters.installation.apiKey);
  useAutoResizer();

  // const clearField = async () => {
  //   await sdk.field.removeValue();
  //   setFieldValue(undefined);
  //   setVideos(undefined);
  //   sdk.entry.save();
  // };

  const setVideo = () => {
    sdk.field.setValue(['Ipv_LWcdfC0']);
    setFieldValue(['Ipv_LWcdfC0']);
    sdk.entry.save();
  };

  const openDialog = () => {
    sdk.dialogs.openCurrent({
      position: 'top',
      minHeight: '75vh',
      width: 'fullWidth',
      shouldCloseOnOverlayClick: true,
    });
  };

  // useEffect(() => {
  //   if (fieldValue) {
  //     getVideosInfo(fieldValue);
  //   }
  // }, [fieldValue, getVideosInfo]);

  return (
    <>
      value: {sdk.field.getValue()}
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
