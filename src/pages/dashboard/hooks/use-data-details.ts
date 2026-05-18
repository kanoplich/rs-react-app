import { searchPokemon } from '@/shared/api';
import type { SearchData } from '@/shared/types';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseDataDetailsReturn {
  handleOpen: (query: string) => void;
  handleClose: () => void;
  isLoading: boolean;
  dataDetails: SearchData | null;
  error: string | null;
  isDetailsOpen: boolean;
  handleResetError: () => void;
}

export const useDataDetails = (): UseDataDetailsReturn => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataDetails, setDataDetails] = useState<SearchData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setIsDetailsOpen(true);

    try {
      const data = await searchPokemon(query);
      setDataDetails(data);
      const newParams = new URLSearchParams(searchParams);
      newParams.set('details', data.id.toString());
      setSearchParams(newParams);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Data not found');
      setDataDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('details');
    setSearchParams(newParams);
    setIsDetailsOpen(false);
    setDataDetails(null);
    setError(null);
  };

  const handleResetError = () => {
    setError(null);
    setIsDetailsOpen(false);
  };

  return {
    handleOpen,
    handleClose,
    handleResetError,
    isLoading,
    dataDetails,
    error,
    isDetailsOpen,
  };
};
