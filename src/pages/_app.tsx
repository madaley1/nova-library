import Layout from '@/components/Layout';

import { StrictMode, useEffect } from 'react';

import userSettings from '@/resources/store';
import type { AppProps } from 'next/app';
import { Provider, useDispatch } from 'react-redux';
import './globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <Provider store={userSettings}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </StrictMode>
  );
}
