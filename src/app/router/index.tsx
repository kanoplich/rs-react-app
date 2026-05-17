import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '../layout';
import { Dashboard, NotFound, About } from '@/pages';
import { ROUTES } from '@/shared/config';

export const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: ROUTES.HOME,
          element: <Dashboard />,
        },
        {
          path: ROUTES.ABOUT,
          element: <About />,
        },
        {
          path: ROUTES.NOT_FOUND,
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    basename: '/rs-react-app/',
  }
);
