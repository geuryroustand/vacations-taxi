/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable unicorn/prefer-module */

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

import ReactDOM from "react-dom";
import React from "react";
import SSRProvider from "react-bootstrap/SSRProvider";
import Script from "next/script";

import { Provider } from "react-redux";
import Head from "next/head";

// import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
// eslint-disable-next-line no-unused-vars

import Layout from "../src/Components/Layout/Layout";

import store from "../src/redux/store";
import addOrganizationJsonLd from "../src/Helper/addOrganizationJsonLd";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        id="organization-jsonLD"
        type="application/ld+json"
        key="organization-jsonLD"
        dangerouslySetInnerHTML={addOrganizationJsonLd()}
      />

      <Provider store={store}>
        <SSRProvider>
          {/* <PersistGate loading="Loading" persistor={persistor}> */}
          <Layout>
            <Head>
              <title>Book A Taxi Online | Airport Transportation</title>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta
                name="description"
                content="Book a taxi online for easy airport transfers to/from your accommodation. Various taxi transportation services. Tried & trusted. Flight tracking. 24/7 support."
              />
              <meta
                name="keywords"
                content="VacationsTaxis, Vacations Taxis, Vacations Taxis Dominican Republic, book a taxi,book taxi online, taxi transportation,online cab booking,book airport taxi, taxi ride to airport,online taxi service,cab ride to airport,taxi transportation near me,taxi transportation services,airport car service,airport transportation near me , airport transportation services,airport ride service,airport transfer service, private airport transfer service,best private airport transfer "
              />
              <link rel="canonical" href="https://www.vacationstaxis.com/" key="canonical" />
              <meta name="robots" content="index, follow" />
              <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" />
              <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png" />
              <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png" />
              <link rel="manifest" href="favicon/site.webmanifest" />
              <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#5bbad5" />
              <meta name="msapplication-TileColor" content="#da532c" />
              <meta name="theme-color" content="#ffffff" />
            </Head>
            {/* <!-- TRUENDO Privacy Center --> */}
            <Script
              strategy="worker"
              id="truendoAutoBlock"
              type="text/javascript"
              src="https://cdn.priv.center/pc/truendo_cmp.pid.js"
              data-siteid="9c95c2f3-c18c-49ce-b8dd-1e5c04cb32b2"
            />
            {/* <!-- End TRUENDO Privacy Center --> */}
            <Component {...pageProps} />
          </Layout>
          {/* </PersistGate> */}
        </SSRProvider>
      </Provider>
    </>
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
