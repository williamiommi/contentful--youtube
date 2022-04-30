import { useEffect, useRef, useState } from 'react';
import { IYTError, IYTResource, IYTResponse, IUseYTSearchOptions } from '../interfaces';
const YT_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const useYtSearch = (apiKey: string, options: IUseYTSearchOptions = {}) => {
  const nextPageRef = useRef<string>();
  const prevPageRef = useRef<string>();
  const queryTermRef = useRef<string>();
  const [error, setError] = useState<string>();
  const [videos, setVideos] = useState<IYTResource[]>([]);

  const generateSearchParams = (pageToken?: string): string => {
    const searchParams = new URLSearchParams();
    searchParams.append('key', apiKey);
    searchParams.append('part', 'snippet');
    if (queryTermRef.current) searchParams.append('q', queryTermRef.current);
    if (pageToken) searchParams.append('pageToken', pageToken);
    // print options
    for (let option in options) {
      searchParams.append(option, `${options[option as keyof typeof options]}`);
    }
    return searchParams.toString();
  };

  const handleError = async (res: Response) => {
    const json = (await res.json()) as IYTError;
    setError(json.error.message);
    throw json.error.message;
  };

  const fetchData = async (params: string): Promise<IYTResponse> => {
    const res = await fetch(`${YT_BASE_URL}?${params}`);
    if (!res.ok) handleError(res);
    return res.json();
  };

  const updateData = (videos: IYTResource[], nextPageToken: string, prevPageToken: string) => {
    nextPageRef.current = nextPageToken;
    prevPageRef.current = prevPageToken;
    setError(undefined);
    setVideos(videos);
  };

  const search = async (q: string) => {
    try {
      queryTermRef.current = q;
      const data = await fetchData(generateSearchParams());
      updateData(data.items, data.nextPageToken, data.prevPageToken);
    } catch (e) {
      console.error(e);
      setError('Ops! Something went wrong!');
    }
  };

  const loadMore = async () => {
    try {
      if (!nextPageRef.current) return;
      const data = await fetchData(generateSearchParams(nextPageRef.current));
      updateData([...videos, ...data.items], data.nextPageToken, data.prevPageToken);
    } catch (e) {
      console.error(e);
      setError('Ops! Something went wrong!');
    }
  };

  const nextPage = async () => {
    try {
      if (!nextPageRef.current) return;
      const data = await fetchData(generateSearchParams(nextPageRef.current));
      updateData(data.items, data.nextPageToken, data.prevPageToken);
    } catch (e) {
      console.error(e);
      setError('Ops! Something went wrong!');
    }
  };

  const prevPage = async () => {
    try {
      if (!prevPageRef.current) return;
      const data = await fetchData(generateSearchParams(prevPageRef.current));
      updateData(data.items, data.nextPageToken, data.prevPageToken);
    } catch (e) {
      console.error(e);
      setError('Ops! Something went wrong!');
    }
  };

  useEffect(() => {
    if (!apiKey) setError('Please provide an api key');
  }, [apiKey]);

  return { error, videos, search, loadMore, nextPage, prevPage };
};

export default useYtSearch;
