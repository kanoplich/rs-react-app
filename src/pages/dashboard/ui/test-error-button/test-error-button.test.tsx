import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestErrorButton } from '.';
import { ErrorBoundary } from '@/app/providers';

describe('TestErrorButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('show error button', () => {
    render(<TestErrorButton />);

    const button = screen.getByRole('button', { name: /error button/i });
    expect(button).toBeInTheDocument();
  });

  it('show error after click', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <TestErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /error button/i });
    await user.click(button);

    expect(screen.getByText(/Something wrong/i)).toBeInTheDocument();
  });
});
