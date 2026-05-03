import { Component } from 'react';
import { SearchBar } from './ui/search-bar';
import { Card } from './ui/card/card';
import { Loader } from '@/shared/ui';
import type { PokemonData, Results, SearchResult } from '@/shared/types/data';

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
    const { searchQuery } = this.state;

    if (searchQuery) {
      this.searchData(searchQuery);
    } else {
      this.fetchData();
    }
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=20`
      );

      if (!response.ok) {
        throw new Error('Fail load data');
      }

      const data: PokemonData = await response.json();

      if (this.isMounted) {
        this.setState({
          data: data.results,
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
    if (!query.trim()) {
      this.fetchData();
      return;
    }

    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error('Data not found');
      }

      const data: SearchResult = await response.json();

      if (this.isMounted) {
        this.setState({
          data: data.forms,
          loading: false,
          error: null,
        });
      }
    } catch (err) {
      if (this.isMounted) {
        this.setState({
          error: err instanceof Error ? err.message : 'Pokemon not found',
          loading: false,
          data: null,
        });
      }
    }
  };

  handleSearch = (query: string) => {
    localStorage.setItem('searchQuery', query);
    this.setState({ searchQuery: query });

    if (query.trim()) {
      this.searchData(query);
    } else {
      this.fetchData();
    }
  };

  render() {
    const { loading, data, searchQuery } = this.state;
    return (
      <>
        <SearchBar
          onSearch={this.handleSearch}
          initialValue={searchQuery}
          placeholder="Search... Enter only full name"
        />

        {loading && <Loader />}

        {data && (
          <div className="border border-border rounded-lg p-2">
            {data.map((item) => (
              <Card key={item.name} name={item.name} url={item.url} />
            ))}
          </div>
        )}
      </>
    );
  }
}
