import { it, expect } from 'vitest';

import { render, screen } from '@testing-library/react';
import { Header } from './index';

it('show header', () => {
  render(<Header />);

  expect(screen.getByText('RS React App')).toBeInTheDocument();
});
