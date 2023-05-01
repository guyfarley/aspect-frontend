import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { InstallsProvider } from '../context/InstallsContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <InstallsProvider>
      <Component {...pageProps} />
    </InstallsProvider>
  )
}

export default MyApp
