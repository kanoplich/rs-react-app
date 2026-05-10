import { it, expect } from 'vitest';

import { render, screen } from '@testing-library/react';
import { Footer } from './index';

it('show footer', () => {
  render(<Footer />);

  const link = screen.getByRole('link', { name: '' });

  expect(screen.getByText('2026')).toBeInTheDocument();
  expect(link).toHaveAttribute('href', 'https://rs.school/');
});
