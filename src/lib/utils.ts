export const formatCount = (num?: number) => {
  if (!num) return '';
  let formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(num);
};

const createURLSearchParams = (params: Record<string, string | number | undefined>) => {
  const searchParams = new URLSearchParams();
  for (let option in params) {
    if (params[option as keyof typeof params])
      searchParams.append(option, `${params[option as keyof typeof params]}`);
  }
  return searchParams.toString();
};

// IMPROVE IT
export const getSearchParams = (
  apiKey: string,
  query?: string,
  pageToken?: string,
  options?: any
): string =>
  createURLSearchParams({
    key: apiKey,
    part: 'snippet',
    type: 'video',
    videoEmbeddable: 'true',
    maxResults: 50,
    q: query,
    pageToken,
  });

export const getSearchVideoParams = (apiKey: string, videoId: string): string =>
  createURLSearchParams({
    key: apiKey,
    part: 'snippet,contentDetails,statistics,player',
    id: videoId,
    maxWidth: '360',
  });

export const getSearchChannelParams = (apiKey: string, channelId: string): string =>
  createURLSearchParams({
    key: apiKey,
    part: 'snippet',
    id: channelId,
  });
