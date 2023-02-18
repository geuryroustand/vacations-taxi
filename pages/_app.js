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
            <title>Airport Transfers and Taxi Services all over Dominican Republic</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
              name="description"
              content="VacationsTaxis- Offers Safe and Affordably Private Airport Taxi Service & Transfers from SDQ Santo Domingo Airport transfers, PUJ Punta Cana Airport Transfers, POP Puerto Plata Airport Transfers, LRM La Romana Airports Transfers, AZS Samana Aiport Transfer, STI Santiago Airport Transfers to all hotels all over the Dominican Republic."
            />
            <meta
              name="keywords"
              content="Dominican Airport Transfers Services,PUJ Punta cana Airport Transfer,AZS Samana Airport Transfers,SDQ Santo Domingo Airport Transfers, POP Puerto Plata Airport Transfers, STI Santiago Airport Transfer"
            />

            <meta name="robots" content="index, follow" />
            <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png" />
            <link rel="manifest" href="favicon/site.webmanifest" />
            <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
          </Head>
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
