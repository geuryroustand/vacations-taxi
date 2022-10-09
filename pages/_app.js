import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../src/Components/Layout/Layout";
import ReactDOM from "react-dom";
import React from "react";
import SSRProvider from "react-bootstrap/SSRProvider";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
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
