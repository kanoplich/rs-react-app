import { ROUTES } from '@/shared/config';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="mt-4 flex flex-col items-center">
      <h2>404 error</h2>
      <div className="text-xl">page not found</div>
      <Link
        to={ROUTES.HOME}
        className="group inline-flex items-center gap-2 px-3 py-1.5 mt-6 rounded-md hover:bg-accent transition-colors hover:text-text-h"
      >
        Go back to Home
      </Link>
    </div>
  );
};
