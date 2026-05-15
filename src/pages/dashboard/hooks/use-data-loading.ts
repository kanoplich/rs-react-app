import { useEffect, useState } from 'react';
import { fetchPokemonList, searchPokemon } from '@/shared/api';
import { useLocalStorage } from '@/shared/hooks';
import type { Results } from '@/shared/types';

interface UseDataReturn {
  data: Results[] | null;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  handleSearch: (query: string) => void;
  handleResetError: () => void;
}

export const useDataLoading = (): UseDataReturn => {
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const [data, setData] = useState<Results[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    if (searchQuery) {
      searchData(searchQuery);
    } else {
      fetchData();
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonList();
      setData(data);
    } catch (error) {
      setData(null);
      setError(error instanceof Error ? error.message : 'Loading error');
    } finally {
      setIsLoading(false);
    }
  };

  const searchData = async (query: string) => {
    if (!query) {
      fetchData();
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await searchPokemon(query);
      setData(data);
    } catch (error) {
      setData(null);
      setError(error instanceof Error ? error.message : 'Data not found');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    const queryTrimmed = query.trim().toLocaleLowerCase();
    setSearchQuery(queryTrimmed);

    if (queryTrimmed) {
      searchData(queryTrimmed);
    } else {
      fetchData();
    }
  };

  const handleResetError = (): void => {
    setError(null);
    loadInitialData();
  };

  return {
    data,
    isLoading,
    searchQuery,
    error,
    handleSearch,
    handleResetError,
  };
};
