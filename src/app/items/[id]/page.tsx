// src/app/items/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useProductContext } from '../../../context/ProductContext';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  List,
  ListItem,
} from '@mui/material';

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

export default function ProductPage() {
  const { id } = useParams(); // Use useParams to get the dynamic route parameter
  const { products } = useProductContext();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (products.length) {
      const foundProduct = products.find((p) => p.id.toString() === id);
      setProduct(foundProduct || null);
    }
  }, [products, id]);

  if (!product) return <Typography variant="h6">Product not found</Typography>;

  return (
    <Container>
      <Box mb={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          {product.title}
        </Typography>
      </Box>
      <Card>
        <CardMedia
          component="img"
          alt={product.title}
          height="300"
          image={product.images[0]}
        />
        <CardContent>
          <Typography variant="h6">Description</Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h6">
            Price: ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="h6">Category: {product.category}</Typography>
          <Typography variant="h6">Brand: {product.brand}</Typography>
          <Typography variant="h6">Rating: {product.rating}</Typography>
          <Typography variant="h6">Stock: {product.stock}</Typography>
          <Typography variant="h6">
            Warranty: {product.warrantyInformation}
          </Typography>
          <Typography variant="h6">
            Shipping Info: {product.shippingInformation}
          </Typography>
          <Typography variant="h6">Reviews</Typography>
          <List>
            {product.reviews.map((review, index) => (
              <ListItem key={index}>
                <Typography variant="body2">
                  <strong>{review.reviewerName}</strong> ({review.rating}/5) -{' '}
                  {review.comment}
                </Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <button
        style={{
          background: '#282c34',
          padding: '0.5rem',
          margin: '1rem 0',
          color: 'white',
          cursor: 'pointer',
        }}
        onClick={() => window.history.back()}
      >
        Back
      </button>
    </Container>
  );
}
