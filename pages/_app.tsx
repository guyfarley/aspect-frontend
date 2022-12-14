import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { InstallsProvider } from '../context/InstallsContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <InstallsProvider>
        <Component {...pageProps} />
      </InstallsProvider>
    </UserProvider>
  )
}

export default MyApp
