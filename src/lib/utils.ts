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
