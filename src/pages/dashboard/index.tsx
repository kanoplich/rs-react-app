import { SearchBar } from './ui/search-bar';
import { Card } from './ui/card/card';
import { Loader } from '@/shared/ui';
import { ErrorFallback } from '@/app/providers';
import { TestErrorButton } from './ui/test-error-button';
import { useDataLoading } from './hooks/use-data-loading';

export const Dashboard = () => {
  const {
    data,
    isLoading,
    searchQuery,
    error,
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

      {data && (
        <div className="border border-border rounded-lg p-2">
          {data.map((item) => (
            <Card key={item.name} name={item.name} url={item.url} />
          ))}
        </div>
      )}

      {error && <ErrorFallback error={error} resetError={handleResetError} />}

      <TestErrorButton />
    </>
  );
};
