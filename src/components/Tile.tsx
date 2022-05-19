import { RelativeDateTime } from '@contentful/f36-components';
import { formatCount } from '../lib/utils';

interface TileProps {
  videoId?: string;
  title?: string;
  description?: string;
  embedHtml?: string;
  viewCount?: number;
  commentCount?: number;
  likeCount?: number;
  publishedAt?: string;
  channelThumbnail?: string;
  channelCustomUrl?: string;
  channelTitle?: string;
}

const Tile = ({
  videoId,
  title,
  description,
  embedHtml,
  viewCount,
  commentCount,
  likeCount,
  publishedAt,
  channelCustomUrl,
  channelThumbnail,
  channelTitle,
}: TileProps) => {
  return (
    <div className="flex space-x-3">
      {embedHtml && <div dangerouslySetInnerHTML={{ __html: embedHtml }} />}
      <div>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          className="text-xs text-gray-600 transition-all hover:opacity-90"
          rel="noreferrer"
        >
          <h2 className="text-lg font-bold text-black">{title}</h2>
          <p>
            {formatCount(viewCount)} views • <RelativeDateTime date={publishedAt ?? ''} />
          </p>
        </a>
        <a
          className="my-2 inline-flex items-center space-x-2 transition-colors hover:text-black"
          target="_blank"
          href={`https://www.youtube.com/c/${channelCustomUrl}`}
          title={`Visit ${channelTitle} channel`}
          rel="noreferrer"
        >
          {channelThumbnail && (
            <img
              className="inline h-6 w-6 rounded-full"
              src={channelThumbnail}
              alt={`${channelTitle} Channel`}
            />
          )}
          <span>{channelTitle}</span>
        </a>
        <p className="mt-3 max-w-md line-clamp-2">{description}</p>
        <div className="mt-5 flex space-x-5">
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 inline-block h-5 w-5 fill-blue-600"
              viewBox="0 0 20 20"
            >
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            {formatCount(commentCount)}
          </span>
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 inline-block h-5 w-5 fill-red-600"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            {formatCount(likeCount)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tile;
