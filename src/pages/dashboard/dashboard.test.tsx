import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dashboard } from './index';
import { fetchPokemonList, searchPokemon } from '@/shared/api';

vi.mock('@/shared/api', () => ({
  fetchPokemonList: vi.fn(),
  searchPokemon: vi.fn(),
}));

describe('Dashboard', () => {
  const mockPokemonList = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
  ];

  const mockSearchResult = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  };
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('Initial rendering and data loading', () => {
    it('show loader', () => {
      vi.mocked(fetchPokemonList).mockImplementation(
        () => new Promise(() => {})
      );

      render(<Dashboard />);

      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('load and show Pokemon list', async () => {
      vi.mocked(fetchPokemonList).mockResolvedValueOnce(mockPokemonList);

      render(<Dashboard />);

      await waitFor(() => {
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
        expect(screen.getByText('ivysaur')).toBeInTheDocument();
        expect(screen.getByText('venusaur')).toBeInTheDocument();
      });

      expect(fetchPokemonList).toHaveBeenCalledTimes(1);
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    it('show error for failed download', async () => {
      const errorMessage = 'Network error';
      vi.mocked(fetchPokemonList).mockRejectedValueOnce(
        new Error(errorMessage)
      );

      render(<Dashboard />);

      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });

      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
    });
  });

  describe('Search functionality', () => {
    it('search', async () => {
      const user = userEvent.setup();

      vi.mocked(fetchPokemonList).mockResolvedValueOnce(mockPokemonList);

      render(<Dashboard />);

      await waitFor(() => {
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      });

      vi.mocked(searchPokemon).mockResolvedValueOnce(mockSearchResult);

      const searchInput = screen.getByPlaceholderText(/Search/i);
      await user.type(searchInput, 'pikachu');
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(screen.getByText('pikachu')).toBeInTheDocument();
        expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
      });

      expect(searchPokemon).toHaveBeenCalledWith('pikachu');
      expect(searchPokemon).toHaveBeenCalledTimes(1);
    });

    it('show full list if search field empty', async () => {
      const user = userEvent.setup();

      vi.mocked(fetchPokemonList).mockResolvedValueOnce(mockPokemonList);

      render(<Dashboard />);

      await waitFor(() => {
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      });

      vi.mocked(fetchPokemonList).mockResolvedValueOnce(mockPokemonList);

      const searchInput = screen.getByPlaceholderText(/Search/i);
      await user.type(searchInput, '   ');
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(fetchPokemonList).toHaveBeenCalledTimes(2);
      });
    });

    it('show not found error', async () => {
      const user = userEvent.setup();

      vi.mocked(fetchPokemonList).mockResolvedValueOnce(mockPokemonList);

      render(<Dashboard />);

      await waitFor(() => {
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      });

      vi.mocked(searchPokemon).mockRejectedValueOnce(
        new Error('Data not found')
      );

      const searchInput = screen.getByPlaceholderText(/Search/i);
      await user.type(searchInput, 'nonexistent');
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(screen.getByText(/Data not found/i)).toBeInTheDocument();
      });

      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });

  describe('localStorage integration', () => {
    it('save in localStorage', async () => {
      const user = userEvent.setup();

      vi.mocked(fetchPokemonList).mockResolvedValueOnce(mockPokemonList);
      vi.mocked(searchPokemon).mockResolvedValueOnce(mockSearchResult);

      render(<Dashboard />);

      await waitFor(() => {
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(/Search/i);
      await user.type(searchInput, 'pikachu');
      await user.keyboard('{Enter}');

      expect(localStorage.getItem('searchQuery')).toBe('pikachu');
    });

    it('restores the search query from localStorage', async () => {
      localStorage.setItem('searchQuery', 'charmander');

      vi.mocked(searchPokemon).mockResolvedValueOnce({
        name: 'charmander',
        url: 'https://pokeapi.co/api/v2/pokemon/4/',
      });

      render(<Dashboard />);

      await waitFor(() => {
        expect(screen.getByText('charmander')).toBeInTheDocument();
      });

      expect(screen.getByDisplayValue('charmander')).toBeInTheDocument();

      expect(fetchPokemonList).not.toHaveBeenCalled();
      expect(searchPokemon).toHaveBeenCalledWith('charmander');
    });
  });

  describe('Error recovery', () => {
    it('reset button', async () => {
      const user = userEvent.setup();

      vi.mocked(fetchPokemonList).mockRejectedValueOnce(
        new Error('Network error')
      );

      render(<Dashboard />);

      await waitFor(() => {
        expect(screen.getByText(/Network error/i)).toBeInTheDocument();
      });

      vi.mocked(fetchPokemonList).mockResolvedValueOnce(mockPokemonList);

      const resetButton = screen.getByRole('button', {
        name: /Try again/i,
      });
      await user.click(resetButton);

      await waitFor(() => {
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
        expect(screen.queryByText(/Network error/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Edge cases', () => {
    it('show empty list if data = null', async () => {
      vi.mocked(fetchPokemonList).mockResolvedValueOnce([]);

      render(<Dashboard />);

      await waitFor(() => {
        expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
      });

      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    it('normalizes search query', async () => {
      const user = userEvent.setup();

      vi.mocked(fetchPokemonList).mockResolvedValueOnce(mockPokemonList);
      vi.mocked(searchPokemon).mockResolvedValueOnce(mockSearchResult);

      render(<Dashboard />);

      await waitFor(() => {
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(/Search/i);
      await user.type(searchInput, '  PIKACHU  ');
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(searchPokemon).toHaveBeenCalledWith('pikachu');
      });

      expect(localStorage.getItem('searchQuery')).toBe('pikachu');
    });
  });
});
