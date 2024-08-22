// src/app/items/[id]/page.tsx
import { Container, Typography, Card, CardMedia, CardContent, List, ListItem } from '@mui/material';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  stock: number;
  warrantyInformation: string;
  shippingInformation: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
  }>;
}

async function fetchProduct(id: string) {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const product: Product = await response.json();
  return product;
}

export default async function ItemDetail({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {product.title}
      </Typography>
      <Card>
        <CardMedia
          component="img"
          alt={product.title}
          height="400"
          image={product.images[0]}
        />
        <CardContent>
          <Typography variant="h6">Description</Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h6">Price: ${product.price.toFixed(2)}</Typography>
          <Typography variant="h6">Category: {product.category}</Typography>
          <Typography variant="h6">Brand: {product.brand}</Typography>
          <Typography variant="h6">Rating: {product.rating}</Typography>
          <Typography variant="h6">Stock: {product.stock}</Typography>
          <Typography variant="h6">Warranty: {product.warrantyInformation}</Typography>
          <Typography variant="h6">Shipping Info: {product.shippingInformation}</Typography>
          <Typography variant="h6">Reviews</Typography>
          <List>
            {product.reviews.map((review, index) => (
              <ListItem key={index}>
                <Typography variant="body2">
                  <strong>{review.reviewerName}</strong> ({review.rating}/5) - {review.comment}
                </Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}
