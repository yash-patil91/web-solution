// src/app/items/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, IconButton, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const theme = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched Data:', data); // Log the fetched data for debugging
        setProducts(data.products); // Ensure data.products is correctly set
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Loading Products...
        </Typography>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Product List
        </Typography>
        <Typography variant="h6">
          No products available.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
        p={2}
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[1]
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Product List
        </Typography>
        <Link href="/search" passHref>
          <IconButton
            color="primary"
            aria-label="search products"
            sx={{
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              }
            }}
          >
            <SearchIcon />
          </IconButton>
        </Link>
      </Box>
      <Grid container spacing={4}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <Link href={`/items/${product.id}`} passHref style={{color:"black",textDecoration:"none"}}>
                <CardMedia
                  component="img"
                  alt={product.title}
                  height="140"
                  image={product.images[0]}
                />
                <CardContent>
                  <Typography variant="h6" component="h2" >
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
