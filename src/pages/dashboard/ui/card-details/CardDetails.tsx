import { Close } from '@/shared/assets/icons';
import type { SearchData } from '@/shared/types';

type CardDetailsProps = {
  data: SearchData;
  handleClose: () => void;
};

export const CardDetails = ({ data, handleClose }: CardDetailsProps) => {
  const { id, name, base_experience, weight } = data;
  return (
    <div className="relative border border-border rounded-lg bg-bg shadow-lg p-6">
      <div className=" flex flex-col justify-between my-1">
        <h2 className="text-2xl font-bold text-text-h capitalize mb-4 pr-8">
          {name}
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <span className="text-text-muted font-medium">ID:</span>
            <span className="text-text font-semibold">#{id}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-border">
            <span className="text-text-muted font-medium">Weight:</span>
            <span className="text-text font-semibold">{weight} kg</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-border">
            <span className="text-text-muted font-medium">
              Base Experience:
            </span>
            <span className="text-text font-semibold">
              {base_experience} XP
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 
                   transition-colors duration-200 focus:outline-none 
                   focus:ring-2 focus:ring-accent rounded-full p-1"
        aria-label="Close"
      >
        <Close />
      </button>
    </div>
  );
};
