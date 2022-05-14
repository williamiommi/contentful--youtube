import { memo, useMemo } from 'react';
import { getElapsedTime } from '../lib/utils';

interface SmallTileProps {
  id?: string;
  thumbnail?: string;
  title?: string;
  date?: string;
  onSelect: (id?: string) => void;
  onPreview: (id?: string) => void;
}

const SmallTile = ({ id, thumbnail, title, date, onSelect, onPreview }: SmallTileProps) => {
  console.log('smallTile render::');
  const formattedDate = useMemo(() => getElapsedTime(date), [date]);
  const ctas = useMemo(() => {
    return [
      { label: 'PREVIEW', cb: () => onPreview(id) },
      { label: 'SELECT', cb: () => onSelect(id) },
    ];
  }, [id]);
  return (
    <div className="flex max-w-[200px] cursor-pointer flex-col text-left">
      <div className="relative group">
        <img
          src={thumbnail}
          alt={title}
          className="group-hover:blur-sm transition-all duration-300"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col space-y-3 justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          {ctas.map((btn) => (
            <button
              key={btn.label}
              className="font-bold py-1 rounded-md border border-white text-white hover:text-black hover:bg-white w-24 transition-all"
              onClick={btn.cb}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
      <h2 className="text-sm mt-1 font-semibold" dangerouslySetInnerHTML={{ __html: `${title}` }} />
      {formattedDate && <span className="text-xs text-gray-500">{formattedDate}</span>}
    </div>
  );
};

export default memo(SmallTile);
