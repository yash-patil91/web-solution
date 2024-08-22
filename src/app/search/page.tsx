"use client";

import { useState } from 'react';
import { useProductContext } from '../../context/ProductContext';
import { Container, TextField,useTheme,IconButton,Box, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export default function SearchPage() {
    const { products } = useProductContext();
    const [query, setQuery] = useState('');
  const theme = useTheme();


    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );

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
          Search Product Here
        </Typography>
        <Link href="/" passHref>
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
            <ArrowBackIosIcon />
          </IconButton>
        </Link>
      </Box>
            <TextField
                fullWidth
                variant="outlined"
                label="Search Products"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                margin="normal"
            />
            <Grid container spacing={4} mt={2}>
                {filteredProducts.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Link href={`/items/${product.id}`} passHref style={{color:"black",textDecoration:"none"}}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt={product.title}
                                    height="140"
                                    image={product.images[0]}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="h2">
                                        {product.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        ${product.price.toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
