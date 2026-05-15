import { Layout } from './layout';
import { ErrorBoundary } from './providers';

export const App = () => {
  return (
    <ErrorBoundary>
      <Layout />
    </ErrorBoundary>
  );
};
