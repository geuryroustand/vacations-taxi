/* eslint-disable @typescript-eslint/no-require-imports */
import React from "react";
import ReactDOM from "react-dom";

import Script from "next/script";
import Head from "next/head";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

// import { HydrationOverlay } from "@builder.io/react-hydration-overlay";

import { Provider } from "react-redux";

import Layout from "../src/Components/Layout/Layout";

import wrapper from "../src/redux/store";

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    // <HydrationOverlay>
    <Provider store={store}>
      <Layout>
        <Head>
          <title>Reliable Airport Transfers and Vacation Taxis | VacationsTaxis</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Book reliable airport transfers and vacation taxis with Vacations Taxis. Enjoy stress-free travel with our professional and punctual transportation services."
          />
          <meta
            name="keywords"
            content="VacationsTaxis, Vacations Taxis,Vacations Taxi, Vacations Taxis Dominican Republic, book a taxi,book taxi online, taxi transportation,online cab booking,book airport taxi, taxi ride to airport,online taxi service,cab ride to airport,taxi transportation near me,taxi transportation services,airport car service,airport transportation near me , airport transportation services,airport ride service,airport transfer service, private airport transfer service,best private airport transfer "
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

        {/* <!-- Google Tag Manager --> */}
        <Script
          id="google-tag-manager"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${
            process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID
          }')
           `
          }}
        />

        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${
            process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
          }`}
        />

        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${
                process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
              }', {
                page_path: window.location.pathname,
              });
            `
          }}
        />
        {/* <!-- TRUENDO Privacy Center --> */}
        {/* <Script
              strategy="lazyOnload"
              id="truendoAutoBlock"
              // type="text/partytown"
              type="text/javascript"
              src="https://cdn.priv.center/pc/truendo_cmp.pid.js"
              data-siteid="9c95c2f3-c18c-49ce-b8dd-1e5c04cb32b2"
            /> */}
        {/* <!-- End TRUENDO Privacy Center --> */}
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
    // </HydrationOverlay>
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
  // eslint-disable-next-line global-require, unicorn/prefer-module, import/no-extraneous-dependencies
  const axe = require("@axe-core/react");
  axe(React, ReactDOM, 1000, config);
}

export default MyApp;
