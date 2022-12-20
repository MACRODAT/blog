//  @ts-nocheck

// G-1T471P3SP1

import React, {useEffect, useState} from 'react';



import  Layout  from '../components/Layout';

import 'tailwindcss/tailwind.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import '../styles/globals.scss';

import { Analytics } from '@vercel/analytics/react';

import type { AppProps } from 'next/app'
import { config } from "@fortawesome/fontawesome-svg-core";
import { makeStore } from '../store/store';
import {PersistGate} from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'
import {Provider, useDispatch} from 'react-redux';
import Script from 'next/script';
import { Html } from 'next/document';
import Head from 'next/head';



config.autoAddCss = false
let store : any;

function MyApp({ Component, pageProps }: AppProps) {
  store = makeStore();
  let persistor = persistStore(store);
  
  let loadingUI = (
    <div style={{backgroundColor: '#440066', color: '#F5B09F', width: '100vw', height: '100vh'}}>
      <h1 style={{textAlign: 'center', verticalAlign: 'center'}}>Loading, please wait...</h1>
    </div>
  );
  
  return (
      <Provider store={store}>
        <PersistGate loading={loadingUI} persistor={persistor}>
          <Layout>
              <Component  {...pageProps}/>
              <Analytics />
              <Script strategy="afterInteractive" 
                      src="https://www.googletagmanager.com/gtag/js?id=G-1T471P3SP1" />
              <Script id="google-analytics" strategy="afterInteractive">
                {
                `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-1T471P3SP1');
                `
                }
              </Script>
              
          </Layout>
        </PersistGate>
      </Provider>
  )
}

// MyApp.getInitialProps = async (appContext : any) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default (MyApp);
export {
  store
};
