import "./globals.css";

import { Footer, NavBar } from "@components";
import React, { Suspense } from 'react';

export const metadata = {
  title: "Car Hub",
  description: "Discover world's best car showcase application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='relative'>
        <NavBar />
        {children}
        <Suspense fallback={<div>Loading...</div>}>
          <Footer />
        </Suspense>

      </body>
    </html>
  );
}
