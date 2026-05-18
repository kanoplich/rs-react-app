import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dashboard } from './index';
import { fetchPokemonList, searchPokemon } from '@/shared/api';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@/shared/api', () => ({
  fetchPokemonList: vi.fn(),
  searchPokemon: vi.fn(),
}));

describe('Dashboard', () => {
  const mockPokemonList = {
    count: 30,
    next: '',
    previous: null,
    results: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
      {
        name: 'ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2/',
      },
      {
        name: 'venusaur',
        url: 'https://pokeapi.co/api/v2/pokemon/3/',
      },
    ],
  };

  const mockSearchResult = {
    id: 1,
    name: 'pikachu',
    base_experience: 65,
    weight: 74,
    forms: [
      {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25/',
      },
    ],
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

      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );

      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('load and show Pokemon list', async () => {
      vi.mocked(fetchPokemonList).mockResolvedValueOnce(mockPokemonList);

      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );

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

      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );

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

      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );

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

      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );

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

      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );

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

      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(/Search/i);
      await user.type(searchInput, 'pikachu');
      await user.keyboard('{Enter}');

      expect(JSON.parse(localStorage.getItem('searchQuery')!)).toBe('pikachu');
    });

    it('restores the search query from localStorage', async () => {
      localStorage.setItem('searchQuery', JSON.stringify('charmander'));

      vi.mocked(searchPokemon).mockResolvedValueOnce({
        id: 1,
        name: 'pikachu',
        base_experience: 65,
        weight: 74,
        forms: [
          {
            name: 'charmander',
            url: 'https://pokeapi.co/api/v2/pokemon/4/',
          },
        ],
      });

      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );

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

      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );

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
      vi.mocked(fetchPokemonList).mockResolvedValueOnce({
        count: 1,
        next: '',
        previous: null,
        results: [],
      });

      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
      });

      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    it('normalizes search query', async () => {
      const user = userEvent.setup();

      vi.mocked(fetchPokemonList).mockResolvedValueOnce(mockPokemonList);
      vi.mocked(searchPokemon).mockResolvedValueOnce(mockSearchResult);

      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(/Search/i);
      await user.type(searchInput, '  PIKACHU  ');
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(searchPokemon).toHaveBeenCalledWith('pikachu');
      });

      expect(JSON.parse(localStorage.getItem('searchQuery')!)).toBe('pikachu');
    });
  });

  describe('Pagination', () => {
    const manyPokemonList = {
      count: 25,
      next: 'https://pokeapi.co/api/v2/pokemon/?offset=10&limit=10',
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
        { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
        { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
        { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
        { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
        { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/' },
      ],
    };

    it('shows pagination controls after items are loaded', async () => {
      vi.mocked(fetchPokemonList).mockResolvedValueOnce(manyPokemonList);

      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      });

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('changes page when clicking on page number', async () => {
      const user = userEvent.setup();

      const secondPageList = {
        ...manyPokemonList,
        results: [
          { name: 'weedle', url: 'https://pokeapi.co/api/v2/pokemon/13/' },
          { name: 'kakuna', url: 'https://pokeapi.co/api/v2/pokemon/14/' },
          { name: 'beedrill', url: 'https://pokeapi.co/api/v2/pokemon/15/' },
        ],
      };

      vi.mocked(fetchPokemonList)
        .mockResolvedValueOnce(manyPokemonList)
        .mockResolvedValueOnce(secondPageList);

      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      });

      await user.click(screen.getByText('2'));

      await waitFor(() => {
        expect(screen.getByText('weedle')).toBeInTheDocument();
      });
    });
  });

  describe('CardDetails', () => {
    const mockPokemonList = {
      count: 1,
      next: '',
      previous: null,
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      ],
    };

    const mockDetailsData = {
      id: 25,
      name: 'pikachu',
      base_experience: 112,
      weight: 60,
      forms: [
        {
          name: '',
          url: '',
        },
      ],
    };

    it('opens details panel when clicking on Details button', async () => {
      const user = userEvent.setup();

      vi.mocked(fetchPokemonList).mockResolvedValueOnce(mockPokemonList);
      vi.mocked(searchPokemon).mockResolvedValueOnce(mockDetailsData);

      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('pikachu')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Details'));

      await waitFor(() => {
        expect(screen.getByText('#25')).toBeInTheDocument();
        expect(screen.getByText('60 kg')).toBeInTheDocument();
      });
    });

    it('closes details panel when clicking close button', async () => {
      const user = userEvent.setup();

      vi.mocked(fetchPokemonList).mockResolvedValueOnce(mockPokemonList);
      vi.mocked(searchPokemon).mockResolvedValueOnce(mockDetailsData);

      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('pikachu')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Details'));

      await waitFor(() => {
        expect(screen.getByText('#25')).toBeInTheDocument();
      });

      await user.click(screen.getByLabelText('Close'));

      await waitFor(() => {
        expect(screen.queryByText('#25')).not.toBeInTheDocument();
      });
    });

    it('shows error when details loading fails', async () => {
      const user = userEvent.setup();

      vi.mocked(fetchPokemonList).mockResolvedValueOnce(mockPokemonList);
      vi.mocked(searchPokemon).mockRejectedValueOnce(
        new Error('Failed to load')
      );

      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('pikachu')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Details'));

      await waitFor(() => {
        expect(screen.getByText(/Failed to load/i)).toBeInTheDocument();
      });
    });
  });
});
