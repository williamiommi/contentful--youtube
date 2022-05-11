import { useMemo } from 'react';
import { getElapsedTime } from '../lib/utils';

interface SmallTileProps {
  id?: string;
  thumbnail?: string;
  title?: string;
  date?: string;
  onClick: (id?: string) => void;
}

const SmallTile = ({ id, thumbnail, title, date, onClick }: SmallTileProps) => {
  const formattedDate = useMemo(() => getElapsedTime(date), [date]);
  return (
    <button
      onClick={() => onClick(id)}
      className="flex max-w-[200px] cursor-pointer flex-col text-left"
    >
      <img src={thumbnail} alt={title} />
      <h2 className="text-sm" dangerouslySetInnerHTML={{ __html: `${title}` }} />
      {formattedDate && <span className="text-xs text-gray-500">{formattedDate}</span>}
    </button>
  );
};

export default SmallTile;
