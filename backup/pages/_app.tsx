import React, {useEffect, useState} from 'react';
import App from 'next/app';
import { Layout } from '../components';
import 'tailwindcss/tailwind.css'

import '../styles/globals.scss'

import type { AppProps } from 'next/app'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

// MyApp.getInitialProps = async (appContext : any) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default MyApp
