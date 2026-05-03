import { Component } from 'react';
import { Footer, Header } from '../ui';
import { Dashboard } from '@/pages';

export class Layout extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main className="flex-1">
          <Dashboard />
        </main>
        <Footer />
      </div>
    );
  }
}
