import { Component } from 'react';
import { Footer, Header } from '../ui';

export class Layout extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main className="flex-1"></main>
        <Footer />
      </div>
    );
  }
}
