import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProductPage from '../src/app/items/[id]/page';
import { ProductProvider } from '../src/context/ProductContext';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
  })),
}));

// Import the mocked modules
import { useParams, useRouter } from 'next/navigation';

// Mock product data
const mockProduct = {
  id: 1,
  title: 'Test Product',
  description: 'This is a test product',
  category: 'Electronics',
  price: 999.99,
  brand: 'TestBrand',
  rating: 4.5,
  stock: 100,
  warrantyInformation: '1 year warranty',
  shippingInformation: 'Free shipping',
  reviews: [
    { reviewerName: 'John Doe', rating: 5, comment: 'Great product!' },
    { reviewerName: 'Jane Smith', rating: 4, comment: 'Good value for money' },
  ],
  images: ['test-image.jpg'],
};

// Mock the ProductContext
jest.mock('../src/context/ProductContext', () => ({
  ProductProvider: ({ children }: any) => (
    <div data-testid="mock-provider">{children}</div>
  ),
  useProductContext: () => ({
    products: [mockProduct],
  }),
}));

describe('ProductPage', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
  });

  const renderProductPage = () => {
    render(
      <ProductProvider>
        <ProductPage />
      </ProductProvider>,
    );
  };

  it('renders product details correctly', async () => {
    renderProductPage();

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('This is a test product')).toBeInTheDocument();
      expect(screen.getByText('Price: $999.99')).toBeInTheDocument();
      expect(screen.getByText('Category: Electronics')).toBeInTheDocument();
      expect(screen.getByText('Brand: TestBrand')).toBeInTheDocument();
      expect(screen.getByText('Rating: 4.5')).toBeInTheDocument();
      expect(screen.getByText('Stock: 100')).toBeInTheDocument();
      expect(screen.getByText('Warranty: 1 year warranty')).toBeInTheDocument();
      expect(
        screen.getByText('Shipping Info: Free shipping'),
      ).toBeInTheDocument();
    });
  });

  it('displays product image', async () => {
    renderProductPage();

    await waitFor(() => {
      const image = screen.getByRole('img') as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image.src).toContain('test-image.jpg');
      expect(image.alt).toBe('Test Product');
    });
  });

  it('renders reviews correctly', async () => {
    renderProductPage();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('(5/5) - Great product!')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(
        screen.getByText('(4/5) - Good value for money'),
      ).toBeInTheDocument();
    });
  });

  it('displays "Back" button', async () => {
    renderProductPage();

    await waitFor(() => {
      expect(screen.getByText('Back')).toBeInTheDocument();
    });
  });

  it('displays "Product not found" when product doesn\'t exist', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '999' });
    renderProductPage();

    await waitFor(() => {
      expect(screen.getByText('Product not found')).toBeInTheDocument();
    });
  });
});
