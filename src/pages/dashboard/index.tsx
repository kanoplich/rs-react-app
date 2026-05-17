import { SearchBar } from './ui/search-bar';
import { Card } from './ui/card/card';
import { Loader } from '@/shared/ui';
import { ErrorFallback } from '@/app/providers';
import { TestErrorButton } from './ui/test-error-button';
import { useDataLoading } from './hooks/use-data-loading';
import { Pagination } from '@/shared/ui/pagination';

export const Dashboard = () => {
  const {
    isLoading,
    searchQuery,
    error,
    cardsData,
    totalPages,
    currentPage,
    setPage,
    handleSearch,
    handleResetError,
  } = useDataLoading();

  return (
    <>
      <SearchBar
        onSearch={handleSearch}
        initialValue={searchQuery}
        placeholder="Search... Enter full name"
      />

      {isLoading && <Loader />}

      {cardsData && (
        <div className="border border-border rounded-lg p-2">
          {cardsData.map((item) => (
            <Card key={item.name} name={item.name} />
          ))}
        </div>
      )}

      {error && <ErrorFallback error={error} resetError={handleResetError} />}

      <TestErrorButton />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
};
