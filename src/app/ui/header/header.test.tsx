import { it, expect } from 'vitest';

import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Header } from './index';

it('show header', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  expect(screen.getByText('RS React App')).toBeInTheDocument();
});
