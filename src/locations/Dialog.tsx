import { useRef } from 'react';
import { DialogExtensionSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { Button, TextInput } from '@contentful/f36-components';
import useYtApi from '../lib/hooks/useYtApi';
import SmallTile from '../components/SmallTile';

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

  return (
    <div className="p-10">
      <div className="flex items-center justify-center max-w-2xl mx-auto gap-x-2">
        <TextInput ref={inputRef} className="w-10/12" placeholder="Search for a video..." />
        <Button
          variant="negative"
          className="w-2/12 !font-bold"
          onClick={onSearch}
          isLoading={yt.isFetching}
        >
          {!yt.isFetching ? 'SEARCH' : ''}
        </Button>
      </div>
      <br />
      <br />
      <div className="mx-auto grid max-w-5xl grid-cols-2 justify-items-center gap-x-2 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
        {yt.results.map((video) => (
          <SmallTile
            id={video.id.videoId}
            thumbnail={video.snippet.thumbnails.medium?.url}
            title={video.snippet.title}
            date={video.snippet.publishedAt}
            onClick={(_id) => alert(_id)}
          />
        ))}
      </div>
      {yt.hasLoadMore && (
        <Button
          className="!block mx-auto my-10 !font-bold !min-w-[200px]"
          variant="negative"
          onClick={onLoadMore}
          isLoading={yt.isFetching}
        >
          {!yt.isFetching ? 'LOAD MORE' : ''}
        </Button>
      )}
    </div>
  );
};

export default Dialog;
