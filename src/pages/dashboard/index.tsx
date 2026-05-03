import { Component } from 'react';
import { SearchBar } from './ui/search-bar';

export class Dashboard extends Component {
  render() {
    return (
      <SearchBar
        onSearch={function (query: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
  }
}
