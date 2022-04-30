export interface IUseYTSearchOptions {
  maxResults?: number;
}

interface IYTThumbnail {
  height: number;
  url: string;
  width: number;
}

interface IYTThumbnails {
  default?: IYTThumbnail;
  medium?: IYTThumbnail;
  high?: IYTThumbnail;
  standard?: IYTThumbnail;
  maxres?: IYTThumbnail;
}

export interface IYTError {
  error: {
    message: string;
    code: number;
  };
}

export interface IYTResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: IYTResource[];
}

export interface IYTResource {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: IYTThumbnails;
    channelTitle: string;
    liveBroadcastContent: string;
  };
}
