import { Component } from 'react';
import { Layout } from './layout';
import { ErrorBoundary } from './providers';

export class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    );
  }
}
