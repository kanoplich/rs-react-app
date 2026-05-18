import { useEffect, useState } from 'react';
import { fetchPokemonList, searchPokemon } from '@/shared/api';
import { useLocalStorage } from '@/shared/hooks';
import type { PokemonData, Results } from '@/shared/types';
import { usePagination } from '@/shared/hooks/use-pagination';

interface UseDataReturn {
  data: PokemonData | null;
  cardsData: Results[] | null;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
  handleSearch: (query: string) => void;
  handleResetError: () => void;
}

export const useDataLoading = (): UseDataReturn => {
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const [data, setData] = useState<PokemonData | null>(null);
  const [cardsData, setCardsData] = useState<Results[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const LIMIT = 10;

  const { currentPage, setPage } = usePagination({ totalPages });

  const offset = (currentPage - 1) * LIMIT;

  useEffect(() => {
    loadInitialData();
  }, [currentPage]);

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
      const data = await fetchPokemonList(LIMIT, offset);
      setData(data);
      setCardsData(data.results);

      const totalPages = Math.ceil(data.count / LIMIT);

      setTotalPages(totalPages);
    } catch (error) {
      setData(null);
      setCardsData(null);
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
      setCardsData(data.forms);
      setTotalPages(0);
    } catch (error) {
      setData(null);
      setCardsData(null);
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
    cardsData,
    totalPages,
    currentPage,
    setPage,
    handleSearch,
    handleResetError,
  };
};
