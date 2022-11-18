//  @ts-nocheck

import React, {useEffect, useState} from 'react';
import  Layout  from '../components/Layout';

import 'tailwindcss/tailwind.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; 
// import "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"; 
// import Font Awesome CSS
import '../styles/globals.scss';

import { Analytics } from '@vercel/analytics/react';

import type { AppProps } from 'next/app'
import { config } from "@fortawesome/fontawesome-svg-core";
import { makeStore } from '../store/store';
import {PersistGate} from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'
import {Provider, useDispatch} from 'react-redux';

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  let store = makeStore();
  let persistor = persistStore(store);
  
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
              <Component  {...pageProps}/>
              <Analytics />
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
