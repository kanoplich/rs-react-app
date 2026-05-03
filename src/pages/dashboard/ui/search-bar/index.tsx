import { Component } from 'react';
import { Search, Button } from '@/shared/ui';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

interface SearchBarState {
  query: string;
}

export class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = { query: '' };
  }

  handleSearch = () => {
    this.props.onSearch(this.state.query);
  };

  handleChange = (query: string) => {
    this.setState({ query });
  };

  render() {
    const { placeholder, disabled } = this.props;
    const { query } = this.state;

    return (
      <div className="flex mb-4">
        <Search
          value={query}
          onChange={this.handleChange}
          onSearch={this.handleSearch}
          placeholder={placeholder}
          disabled={disabled}
        />
        <Button
          onClick={this.handleSearch}
          disabled={disabled || !query.trim()}
          className="rounded-l-none rounded-r-md"
        >
          Search
        </Button>
      </div>
    );
  }
}
