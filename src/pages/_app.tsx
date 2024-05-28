import Layout from '@/components/Layout';

import { StrictMode } from 'react';

import userSettings from '@/resources/store';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

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
