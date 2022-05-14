import { formatDistanceToNowStrict } from 'date-fns';

export const formatDate = (date?: string) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatCount = (num?: number) => {
  if (!num) return '';
  let formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(num);
};

export const getElapsedTime = (date?: string) => {
  if (!date) return '';
  return formatDistanceToNowStrict(new Date(date), { addSuffix: true, roundingMethod: 'floor' });
};

const DEFAULT_PART_VIDEO = ['snippet', 'contentDetails', 'statistics', 'player'];

// IMPROVE IT
export const getSearchParams = (
  apiKey: string,
  query?: string,
  pageToken?: string,
  options?: any
): string => {
  const searchParams = new URLSearchParams();
  searchParams.append('key', apiKey);
  searchParams.append('part', 'snippet');
  searchParams.append('type', 'video');
  searchParams.append('videoEmbeddable', 'true');
  if (query) searchParams.append('q', query);
  if (pageToken) searchParams.append('pageToken', pageToken);
  // print options
  for (let option in options) {
    searchParams.append(option, `${options[option as keyof typeof options]}`);
  }
  return searchParams.toString();
};

export const getSearchVideoParams = (apiKey: string, videoIds: string[]): string => {
  const searchParams = new URLSearchParams();
  searchParams.append('key', apiKey);
  searchParams.append('part', DEFAULT_PART_VIDEO.join(','));
  searchParams.append('id', videoIds.join(','));
  searchParams.append('maxWidth', '360');
  return searchParams.toString();
};

export const getSearchChannelParams = (apiKey: string, channelId: string): string => {
  const searchParams = new URLSearchParams();
  searchParams.append('key', apiKey);
  searchParams.append('part', 'snippet');
  searchParams.append('id', channelId);
  return searchParams.toString();
};
