/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable unicorn/prefer-module */

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

import ReactDOM from "react-dom";
import React from "react";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Provider } from "react-redux";
import Head from "next/head";
import Script from "next/script";

// import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
// eslint-disable-next-line no-unused-vars

import Layout from "../src/Components/Layout/Layout";

import store from "../src/redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SSRProvider>
        {/* <PersistGate loading="Loading" persistor={persistor}> */}
        <Layout>
          <Head>
            <title>Experience Stress-Free Travel From The Airports | Hotels in all DR...</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
              name="description"
              content="Get Where You Need to Go Safely and Affordably with Our Airport Transportation Services in the Dominican Republic."
            />
            <meta
              name="keywords"
              content="Dominican Airport Transfers Services, Punta cana Airport Transfer, Samana Airport Transfer, Santo Domingo Airport Transfer"
            />

            <meta name="robots" content="index, follow" />
          </Head>
          <Script
            strategy="lazyOnload"
            id="truendoAutoBlock"
            type="text/javascript"
            src="https://cdn.priv.center/pc/truendo_cmp.pid.js"
            data-siteid="9c95c2f3-c18c-49ce-b8dd-1e5c04cb32b2"
          />
          <Component {...pageProps} />
        </Layout>
        {/* </PersistGate> */}
      </SSRProvider>
    </Provider>
  );
}

const config = {
  rules: [
    {
      id: "skip-link",
      enabled: true
    }
  ]
};

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  const axe = require("@axe-core/react");
  axe(React, ReactDOM, 1000, config);
}

export default MyApp;
