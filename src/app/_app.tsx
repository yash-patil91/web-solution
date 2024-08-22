import React from 'react';
import { ProductProvider } from '../context/ProductContext';
import { CssBaseline } from '@mui/material';
import { AppProps } from 'next/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ProductProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </ProductProvider>
  );
};

export default MyApp;
