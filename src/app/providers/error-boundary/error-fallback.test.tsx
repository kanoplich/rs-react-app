import { it, expect } from 'vitest';

import { render, screen } from '@testing-library/react';
import { ErrorFallback } from './error-fallback';

it('show header', () => {
  render(<ErrorFallback />);

  expect(screen.getByText('Something wrong')).toBeInTheDocument();
});
