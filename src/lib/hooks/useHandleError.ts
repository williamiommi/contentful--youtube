import { FieldExtensionSDK } from '@contentful/app-sdk';
import { useSDK } from '@contentful/react-apps-toolkit';
import { useEffect } from 'react';

const useHandleError = (error?: string) => {
  const sdk = useSDK<FieldExtensionSDK>();
  useEffect(() => {
    if (error) sdk.notifier.error(error);
  }, [sdk.notifier, error]);
};

export default useHandleError;
