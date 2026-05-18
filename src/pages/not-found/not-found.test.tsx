import { it, expect } from 'vitest';

import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { NotFound } from './index';

it('show NotFound page', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

  expect(screen.getByText('404 error')).toBeInTheDocument();
});
