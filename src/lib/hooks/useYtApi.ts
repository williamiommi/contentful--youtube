import { useCallback, useEffect, useRef, useState } from 'react';
import {
  IYTError,
  IYTSearchResource,
  IYTSearchResponse,
  IUseYTSearchOptions,
  IYTVideoResponse,
  IYTChannelResponse,
  IYTVideoResource,
} from '../interfaces';
const YT_BASE_URL = 'https://www.googleapis.com/youtube/v3';
const DEFAULT_PART_VIDEO = ['snippet', 'contentDetails', 'statistics', 'player'];

const useYtApi = (apiKey: string, options: IUseYTSearchOptions = {}) => {
  const nextPageRef = useRef<string>();
  const prevPageRef = useRef<string>();
  const queryTermRef = useRef<string>();
  const [error, setError] = useState<string>();
  const [results, setResults] = useState<IYTSearchResource[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [videos, setVideos] = useState<IYTVideoResource[]>();

  const getSearchParams = (pageToken?: string): string => {
    const searchParams = new URLSearchParams();
    searchParams.append('key', apiKey);
    searchParams.append('part', 'snippet');
    searchParams.append('type', 'video');
    searchParams.append('videoEmbeddable', 'true');
    if (queryTermRef.current) searchParams.append('q', queryTermRef.current);
    if (pageToken) searchParams.append('pageToken', pageToken);
    // print options
    for (let option in options) {
      searchParams.append(option, `${options[option as keyof typeof options]}`);
    }
    return searchParams.toString();
  };

  const getSearchVideoParams = useCallback(
    (videoIds: string[]): string => {
      const searchParams = new URLSearchParams();
      searchParams.append('key', apiKey);
      searchParams.append('part', DEFAULT_PART_VIDEO.join(','));
      searchParams.append('id', videoIds.join(','));
      searchParams.append('maxWidth', '360');
      return searchParams.toString();
    },
    [apiKey]
  );

  const getSearchChannelParams = useCallback(
    (channelId: string): string => {
      const searchParams = new URLSearchParams();
      searchParams.append('key', apiKey);
      searchParams.append('part', 'snippet');
      searchParams.append('id', channelId);
      return searchParams.toString();
    },
    [apiKey]
  );

  const handleError = async (res: Response) => {
    const json = (await res.json()) as IYTError;
    setError(json.error.message);
    throw json.error.message;
  };

  const fetchResults = async (params: string): Promise<IYTSearchResponse> => {
    const res = await fetch(`${YT_BASE_URL}/search?${params}`);
    if (!res.ok) handleError(res);
    return res.json();
  };

  const fetchVideos = useCallback(async (params: string): Promise<IYTVideoResponse> => {
    const res = await fetch(`${YT_BASE_URL}/videos?${params}`);
    if (!res.ok) handleError(res);
    return res.json();
  }, []);

  const fetchChannel = useCallback(async (params: string): Promise<IYTChannelResponse> => {
    const res = await fetch(`${YT_BASE_URL}/channels?${params}`);
    if (!res.ok) handleError(res);
    return res.json();
  }, []);

  const updateData = (
    videos: IYTSearchResource[],
    nextPageToken: string,
    prevPageToken: string
  ) => {
    nextPageRef.current = nextPageToken;
    prevPageRef.current = prevPageToken;
    setError(undefined);
    setResults(videos);
    setIsFetching(false);
  };

  const search = async (q: string) => {
    try {
      setIsFetching(true);
      queryTermRef.current = q;
      const data = await fetchResults(getSearchParams());
      updateData(data.items, data.nextPageToken, data.prevPageToken);
    } catch (e) {
      console.error(e);
      setError('Ops! Something went wrong!');
    }
  };

  const loadMore = async () => {
    try {
      if (!nextPageRef.current) return;
      const data = await fetchResults(getSearchParams(nextPageRef.current));
      updateData([...results, ...data.items], data.nextPageToken, data.prevPageToken);
    } catch (e) {
      console.error(e);
      setError('Ops! Something went wrong!');
    }
  };

  const nextPage = async () => {
    try {
      if (!nextPageRef.current) return;
      const data = await fetchResults(getSearchParams(nextPageRef.current));
      updateData(data.items, data.nextPageToken, data.prevPageToken);
    } catch (e) {
      console.error(e);
      setError('Ops! Something went wrong!');
    }
  };

  const prevPage = async () => {
    try {
      if (!prevPageRef.current) return;
      const data = await fetchResults(getSearchParams(prevPageRef.current));
      updateData(data.items, data.nextPageToken, data.prevPageToken);
    } catch (e) {
      console.error(e);
      setError('Ops! Something went wrong!');
    }
  };

  const getVideosInfo = useCallback(
    async (videoIds: string[]) => {
      try {
        const data = await fetchVideos(getSearchVideoParams(videoIds));
        for (let item of data.items) {
          const channel = await fetchChannel(getSearchChannelParams(item.snippet.channelId));
          item.channelInfo = channel.items[0];
        }
        setVideos(data.items);
      } catch (e) {
        console.error(e);
        setError('Ops! Something went wrong!');
      }
    },
    [fetchVideos, fetchChannel, getSearchChannelParams, getSearchVideoParams]
  );

  const _fetchResults = async (url: string): Promise<IYTSearchResponse> => {
    const res = await fetch(url);
    if (!res.ok) handleError(res);
    return res.json();
  };

  const _search = async (q: string) => {
    try {
      queryTermRef.current = q;
      const data = await _fetchResults('../../../data-page1.json');
      updateData(data.items, data.nextPageToken, data.prevPageToken);
    } catch (e) {
      console.error(e);
      setError('Ops! Something went wrong!');
    }
  };

  const _loadMore = async () => {
    try {
      if (!nextPageRef.current) return;
      const data = await _fetchResults(
        `../../../data-page${Math.floor(Math.random() * (5 - 2 + 1)) + 2}.json`
      );
      updateData([...results, ...data.items], data.nextPageToken, data.prevPageToken);
    } catch (e) {
      console.error(e);
      setError('Ops! Something went wrong!');
    }
  };

  useEffect(() => {
    if (!apiKey) setError('Please provide an api key');
  }, [apiKey]);

  return {
    error,
    results,
    _search,
    _loadMore,
    search,
    loadMore,
    nextPage,
    prevPage,
    hasLoadMore: nextPageRef.current,
    isFetching,
    getVideosInfo,
    videos,
    setVideos,
  };
};

export default useYtApi;
