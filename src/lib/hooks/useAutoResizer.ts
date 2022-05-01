import { FieldExtensionSDK } from '@contentful/app-sdk';
import { useSDK } from '@contentful/react-apps-toolkit';
import { useEffect } from 'react';

const useAutoResizer = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  useEffect(() => {
    sdk.window.startAutoResizer();
    return () => sdk.window.stopAutoResizer();
  }, [sdk.window]);
};

export default useAutoResizer;
