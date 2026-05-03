import { Component } from 'react';
import { SearchBar } from './ui/search-bar';
import { Card } from './ui/card/card';
import { Loader } from '@/shared/ui';
import type { PokemonData } from '@/shared/types/data';

interface DashboardProps {
  name?: string;
}

interface DashboardState {
  data: PokemonData | null;
  loading: boolean;
  error: string | null;
}

export class Dashboard extends Component<DashboardProps, DashboardState> {
  private isMounted = false;

  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.isMounted = true;
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/ability/?limit=20`
      );

      if (!response.ok) {
        throw new Error(`Fail load data`);
      }

      const data: PokemonData = await response.json();

      if (this.isMounted) {
        this.setState({
          data: data,
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

  render() {
    const { loading, data } = this.state;
    return (
      <>
        <SearchBar
          onSearch={function (query: string): void {
            throw new Error('Function not implemented.');
          }}
        />

        {loading && <Loader />}

        {data &&
          data.results.map((item) => (
            <Card key={item.name} name={item.name} url={item.url} />
          ))}
      </>
    );
  }
}
