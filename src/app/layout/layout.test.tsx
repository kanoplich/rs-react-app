import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Layout } from './index';

describe('Layout', () => {
  it('renders Header component', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByText('RS React App')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders Footer component', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByText(2026)).toBeInTheDocument();
  });

  it('renders main element with flex-1 class', () => {
    const { container } = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    const main = container.querySelector('main');
    expect(main).toHaveClass('flex-1');
  });

  it('renders Outlet (children content)', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    const main = document.querySelector('main');
    expect(main).toBeInTheDocument();
  });
});
