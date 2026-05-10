import { Component } from 'react';
import { SearchBar } from './ui/search-bar';
import { Card } from './ui/card/card';
import { Loader } from '@/shared/ui';
import type { Results } from '@/shared/types/data';
import { ErrorFallback } from '@/app/providers/error-boundary/error-fallback';
import { TestErrorButton } from './ui/test-error-button';
import { fetchPokemonList, searchPokemon } from '@/shared/api';

interface DashboardProps {
  name?: string;
}

interface DashboardState {
  data: Results[] | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export class Dashboard extends Component<DashboardProps, DashboardState> {
  private isMounted = false;

  constructor(props: DashboardProps) {
    super(props);

    const searchQuery = localStorage.getItem('searchQuery') || '';
    this.state = {
      data: null,
      loading: true,
      error: null,
      searchQuery,
    };
  }

  componentDidMount() {
    this.isMounted = true;
    this.loadInitialData();
  }

  loadInitialData = () => {
    const { searchQuery } = this.state;
    if (searchQuery) {
      this.searchData(searchQuery);
    } else {
      this.fetchData();
    }
  };

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    try {
      const data = await fetchPokemonList();

      if (this.isMounted) {
        this.setState({
          data,
          loading: false,
          error: null,
        });
      }
    } catch (err) {
      if (this.isMounted) {
        this.setState({
          error: err instanceof Error ? err.message : 'Loading error',
          loading: false,
          data: null,
        });
      }
    }
  };

  searchData = async (query: string) => {
    if (!query) {
      this.fetchData();
      return;
    }

    this.setState({ loading: true, error: null });

    try {
      const data = await searchPokemon(query);

      if (this.isMounted) {
        this.setState({
          data,
          loading: false,
          error: null,
        });
      }
    } catch (err) {
      if (this.isMounted) {
        this.setState({
          error: err instanceof Error ? err.message : 'Data not found',
          loading: false,
          data: null,
        });
      }
    }
  };

  handleSearch = (query: string) => {
    const queryTrimmed = query.trim().toLocaleLowerCase();

    localStorage.setItem('searchQuery', queryTrimmed);
    this.setState({ searchQuery: queryTrimmed });

    if (queryTrimmed) {
      this.searchData(queryTrimmed);
    } else {
      this.fetchData();
    }
  };

  handleResetError = (): void => {
    this.setState({
      error: null,
    });

    this.loadInitialData();
  };

  render() {
    const { loading, data, searchQuery, error } = this.state;

    return (
      <>
        <SearchBar
          onSearch={this.handleSearch}
          initialValue={searchQuery}
          placeholder="Search... Enter full name"
        />

        {loading && <Loader />}

        {data && (
          <div className="border border-border rounded-lg p-2">
            {data.map((item) => (
              <Card key={item.name} name={item.name} url={item.url} />
            ))}
          </div>
        )}

        {error && (
          <ErrorFallback error={error} resetError={this.handleResetError} />
        )}

        <TestErrorButton />
      </>
    );
  }
}
