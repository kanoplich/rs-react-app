import { it, expect } from 'vitest';

import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { About } from './index';

it('show About page', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>
  );

  expect(screen.getByText('About us')).toBeInTheDocument();
});
