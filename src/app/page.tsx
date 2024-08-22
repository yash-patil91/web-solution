// src/app/page.tsx
"use client";

import { Container, Grid, Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  images: string[];
}

async function fetchProducts() {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  return data.products as Product[];
}

export default async function Home() {
  const products = await fetchProducts();

  return (
    <Container>
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product List
        </Typography>
        <Link href="/search" passHref>
          <Typography variant="h6" style={{ cursor: 'pointer' }}>
            <SearchIcon />
          </Typography>
        </Link>
      </Box>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                alt={product.title}
                height="200"
                image={product.images[0]}
              />
              <CardContent>
                <Link href={`/items/${product.id}`} passHref>
                  <Typography
                    variant="h6"
                    component="h2"
                    style={{ cursor: 'pointer' }}
                  >
                    {product.title}
                  </Typography>
                </Link>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="body1">${product.price.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
