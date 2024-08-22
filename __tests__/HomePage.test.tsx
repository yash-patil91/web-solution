import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomePage from '../src/app/page';

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children;
  };
});

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      products: [
        {
          id: 1,
          title: 'Test Product',
          price: 9.99,
          images: ['test-image.jpg'],
        },
      ],
    }),
  })
) as jest.Mock;

const theme = createTheme();

describe('HomePage', () => {
  it('renders loading state initially', () => {
    render(
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    );
    expect(screen.getByText('Loading Products...')).toBeInTheDocument();
  });

  it('renders products after loading', async () => {
    render(
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Product List')).toBeInTheDocument();
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('$9.99')).toBeInTheDocument();
    });
  });

  it('renders no products message when no products are available', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ products: [] }),
      })
    );

    render(
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('No products available.')).toBeInTheDocument();
    });
  });
});