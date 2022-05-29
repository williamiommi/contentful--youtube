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

export interface IYTSearchResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: IYTSearchResource[];
}

export interface IYTSearchResource {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId?: string;
    channelId?: string;
    playlistId?: string;
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

export interface IYTVideoResponse {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: IYTVideoResource[];
}

export interface IYTVideoResource {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: IYTThumbnails;
    channelTitle: string;
    tags: [string];
    categoryId: string;
    liveBroadcastContent: string;
    defaultLanguage: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
  };
  statistics: {
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
    favoriteCount: number;
    commentCount: number;
  };
  player: {
    embedHtml: string;
    embedHeight: number;
    embedWidth: number;
  };
  channelInfo?: IYTChannelResource;
}

export interface IYTChannelResponse {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: IYTChannelResource[];
}

export interface IYTChannelResource {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: IYTThumbnails;
    defaultLanguage: string;
    localized: {
      title: string;
      description: string;
    };
    country: string;
  };
}
