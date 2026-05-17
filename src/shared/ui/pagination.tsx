import { useMemo } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const visiblePages = useMemo(() => {
    const delta = 1;
    const range: (number | string)[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }

    return range;
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8 mb-4">
      {visiblePages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && handlePageChange(page)}
          disabled={page === '...'}
          className={`
            min-w-[40px] h-10 px-2 rounded-md border transition-colors
            ${
              currentPage === page
                ? 'bg-accent text-white border-accent font-bold'
                : 'hover:bg-gray-100 hover:border-gray-300'
            }
            ${page === '...' ? 'cursor-default border-transparent' : ''}
          `}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
