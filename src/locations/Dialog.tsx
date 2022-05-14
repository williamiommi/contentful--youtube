import { useCallback, useRef } from 'react';
import { DialogExtensionSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { Button, Modal, TextInput, ModalLauncher, Form } from '@contentful/f36-components';
import useYtApi from '../lib/hooks/useYtApi';
import SmallTile from '../components/SmallTile';
import PreviewModal from '../components/PreviewModal';
import { motion } from 'framer-motion';

const item = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 },
};

const Dialog = () => {
  const sdk = useSDK<DialogExtensionSDK>();
  const yt = useYtApi(sdk.parameters.installation.apiKey);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearch = () => {
    if (inputRef.current?.value && !yt.isFetching) yt._search(inputRef.current.value);
  };

  const onLoadMore = () => {
    if (!yt.isFetching) yt._loadMore();
  };

  const onSelectVideo = useCallback((id?: string) => {
    sdk.close({ id });
  }, []);

  const onModalLauncher = useCallback((id?: string) => {
    ModalLauncher.open(({ onClose }) => {
      return <PreviewModal id={id} onClose={onClose} />;
    });
  }, []);

  return (
    <>
      <Modal.Header title="Search and Select a Video" onClose={sdk.close} />
      <div className="p-10">
        <Form
          onSubmit={onSearch}
          className="flex items-center justify-center max-w-2xl mx-auto gap-x-2"
        >
          <TextInput ref={inputRef} className="w-10/12" placeholder="Search for a video..." />
          <Button
            variant="primary"
            className="w-2/12 !font-bold"
            type="submit"
            isLoading={yt.isFetching}
          >
            {!yt.isFetching ? 'SEARCH' : ''}
          </Button>
        </Form>
        <br />
        <br />
        {yt.results.length > 0 && (
          <ul className="mx-auto grid max-w-5xl grid-cols-2 justify-items-center gap-x-2 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
            {yt.results.map((video) => (
              <motion.li key={video.id.videoId} initial="hidden" animate="show" variants={item}>
                <SmallTile
                  id={video.id.videoId}
                  thumbnail={video.snippet.thumbnails.medium?.url}
                  title={video.snippet.title}
                  date={video.snippet.publishedAt}
                  onSelect={onSelectVideo}
                  onPreview={onModalLauncher}
                />
              </motion.li>
            ))}
          </ul>
        )}
        {yt.hasLoadMore && (
          <Button
            className="!block mx-auto my-10 !font-bold !min-w-[200px]"
            variant="primary"
            onClick={onLoadMore}
            isLoading={yt.isFetching}
          >
            {!yt.isFetching ? 'LOAD MORE' : ''}
          </Button>
        )}
      </div>
    </>
  );
};

export default Dialog;
