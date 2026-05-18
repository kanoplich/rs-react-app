import { SearchBar } from './ui/search-bar';
import { Card } from './ui/card/card';
import { Loader } from '@/shared/ui';
import { ErrorFallback } from '@/app/providers';
import { TestErrorButton } from './ui/test-error-button';
import { useDataLoading } from './hooks/use-data-loading';
import { Pagination } from '@/shared/ui/pagination';
import { useDataDetails } from './hooks/use-data-details';
import { CardDetails } from './ui/card-details';

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

  const {
    handleOpen,
    handleClose,
    dataDetails,
    isDetailsOpen,
    isLoading: isLoadingDetails,
    error: errorDetails,
    handleResetError: handleResetErrorDetails,
  } = useDataDetails();

  return (
    <>
      <SearchBar
        onSearch={handleSearch}
        initialValue={searchQuery}
        placeholder="Search... Enter full name"
      />
      <div className="flex gap-6 mt-4">
        <div
          className={`transition-all duration-300 ${isDetailsOpen ? 'w-1/2' : 'w-full'}`}
        >
          {isLoading && <Loader />}

          {cardsData && (
            <div className="border border-border rounded-lg p-2">
              {cardsData.map((item) => (
                <Card
                  key={item.name}
                  name={item.name}
                  handleOpen={handleOpen}
                />
              ))}
            </div>
          )}
        </div>

        {!error && isDetailsOpen && (
          <div className="w-1/2 border-l border-border pl-6 animate-slideIn">
            {isLoadingDetails && <Loader />}
            {errorDetails && !isLoadingDetails && (
              <ErrorFallback
                error={errorDetails}
                resetError={handleResetErrorDetails}
              />
            )}

            {dataDetails && !isLoadingDetails && !errorDetails && (
              <CardDetails data={dataDetails} handleClose={handleClose} />
            )}
          </div>
        )}
      </div>

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
