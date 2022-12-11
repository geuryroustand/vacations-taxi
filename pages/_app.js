/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable unicorn/prefer-module */

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ReactDOM from "react-dom";
import React from "react";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Provider } from "react-redux";
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
