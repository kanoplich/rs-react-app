import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CardDetails } from './index';
import type { SearchData } from '@/shared/types';

describe('CardDetails', () => {
  const mockData: SearchData = {
    id: 25,
    name: 'pikachu',
    base_experience: 112,
    weight: 60,
    forms: [
      {
        name: '',
        url: '',
      },
    ],
  };

  const mockHandleClose = vi.fn();

  beforeEach(() => {
    mockHandleClose.mockClear();
  });

  it('renders pokemon details correctly', () => {
    render(<CardDetails data={mockData} handleClose={mockHandleClose} />);

    expect(screen.getByText('pikachu')).toBeInTheDocument();

    expect(screen.getByText('#25')).toBeInTheDocument();
    expect(screen.getByText('ID:')).toBeInTheDocument();

    expect(screen.getByText('60 kg')).toBeInTheDocument();
    expect(screen.getByText('Weight:')).toBeInTheDocument();

    expect(screen.getByText('112 XP')).toBeInTheDocument();
    expect(screen.getByText('Base Experience:')).toBeInTheDocument();
  });

  it('calls handleClose when close button is clicked', () => {
    render(<CardDetails data={mockData} handleClose={mockHandleClose} />);

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });
});
