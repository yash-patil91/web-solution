import React from 'react';
import { ProductProvider } from '../context/ProductContext';
import { CssBaseline } from '@mui/material';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProductProvider>
          <CssBaseline />
          {children}
        </ProductProvider>
      </body>
    </html>
  );
}
