import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from './providers';
import { router } from './router';

export const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};
