import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

interface UsePaginationProps {
  totalPages: number;
  defaultPage?: number;
}

export const usePagination = ({
  totalPages,
  defaultPage = 1,
}: UsePaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useMemo(() => {
    const page = searchParams.get('page');
    const pageNumber = page ? parseInt(page, 10) : defaultPage;

    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
      return defaultPage;
    }
    return pageNumber;
  }, [searchParams, totalPages, defaultPage]);

  const setPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;

      setSearchParams(
        (params) => {
          if (page === 1) {
            params.delete('page');
          } else {
            params.set('page', page.toString());
          }
          return params;
        },
        { replace: true }
      );
    },
    [totalPages, setSearchParams]
  );

  const resetPage = useCallback(() => {
    setSearchParams(
      (params) => {
        params.delete('page');
        return params;
      },
      { replace: true }
    );
  }, [setSearchParams]);

  return {
    currentPage,
    setPage,
    resetPage,
  };
};
