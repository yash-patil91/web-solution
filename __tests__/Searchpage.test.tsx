import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchPage from '../src/app/search/page';
import { ProductProvider } from '../src/context/ProductContext';

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
    json: () =>
      Promise.resolve({
        products: [
          { id: 1, title: 'iPhone', price: 999.99, images: ['iphone.jpg'] },
          {
            id: 2,
            title: 'Samsung Galaxy',
            price: 899.99,
            images: ['samsung.jpg'],
          },
          {
            id: 3,
            title: 'Google Pixel',
            price: 799.99,
            images: ['pixel.jpg'],
          },
        ],
      }),
  }),
) as jest.Mock;

describe('SearchPage', () => {
  const renderWithProvider = () => {
    return render(
      <ProductProvider>
        <SearchPage />
      </ProductProvider>,
    );
  };

  it('renders the search input', async () => {
    renderWithProvider();
    await waitFor(() => {
      expect(screen.getByLabelText('Search Products')).toBeInTheDocument();
    });
  });

  it('displays all products after loading', async () => {
    renderWithProvider();
    await waitFor(() => {
      expect(screen.getByText('iPhone')).toBeInTheDocument();
      expect(screen.getByText('Samsung Galaxy')).toBeInTheDocument();
      expect(screen.getByText('Google Pixel')).toBeInTheDocument();
    });
  });

  it('filters products based on search query', async () => {
    const { getByLabelText } = renderWithProvider();

    await waitFor(() => {
      expect(screen.getByText('iPhone')).toBeInTheDocument();
    });

    const searchInput = getByLabelText('Search Products');
    fireEvent.change(searchInput, { target: { value: 'iphone' } });

    await waitFor(() => {
      expect(screen.getByText('iPhone')).toBeInTheDocument();
      expect(screen.queryByText('Samsung Galaxy')).not.toBeInTheDocument();
      expect(screen.queryByText('Google Pixel')).not.toBeInTheDocument();
    });
  });

  it('shows no results when search query matches no products', async () => {
    const { getByLabelText } = renderWithProvider();

    await waitFor(() => {
      expect(screen.getByText('iPhone')).toBeInTheDocument();
    });

    const searchInput = getByLabelText('Search Products');
    fireEvent.change(searchInput, { target: { value: 'Nonexistent Product' } });

    await waitFor(() => {
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });

  it('displays product prices correctly', async () => {
    renderWithProvider();
    await waitFor(() => {
      expect(screen.getByText('$999.99')).toBeInTheDocument();
      expect(screen.getByText('$899.99')).toBeInTheDocument();
      expect(screen.getByText('$799.99')).toBeInTheDocument();
    });
  });

  it('handles case-insensitive search', async () => {
    const { getByLabelText } = renderWithProvider();

    // Wait for the products to load
    await waitFor(() => {
      expect(screen.getByText('Samsung Galaxy')).toBeInTheDocument();
    });

    const searchInput = getByLabelText('Search Products');
    fireEvent.change(searchInput, { target: { value: 'GALAXY' } });

    // Wait for the filtering to take effect
    await waitFor(() => {
      expect(screen.getByText('Samsung Galaxy')).toBeInTheDocument();
      expect(screen.queryByText('iPhone')).not.toBeInTheDocument();
      expect(screen.queryByText('Google Pixel')).not.toBeInTheDocument();
    });
  });
});
