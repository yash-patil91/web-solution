// src/app/search/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Container, TextField, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import Link from 'next/link';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
}

async function fetchProducts() {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products as Product[];
}

export default function Search() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function loadProducts() {
            const fetchedProducts = await fetchProducts();
            setProducts(fetchedProducts);
        }
        loadProducts();
    }, []);

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Search Products
            </Typography>
            <TextField
                fullWidth
                label="Search by title"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                margin="normal"
            />
            <Grid container spacing={4}>
                {filteredProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Link href={`/items/${product.id}`} passHref>
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt={product.title}
                                    height="200"
                                    image={product.images[0]}
                                />
                                <CardContent>

                                    <Typography
                                        variant="h6"
                                        component="h2"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {product.title}
                                    </Typography>

                                    <Typography variant="body2">{product.description}</Typography>
                                    <Typography variant="body1">${product.price.toFixed(2)}</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
