import React from "react";

import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicFooter = dynamic(() => import("../Footer/Footer"), {
  suspense: true
});

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Suspense fallback={`Loading...`}>
        <DynamicFooter />
      </Suspense>

      {/* <Footer /> */}
    </>
  );
};

export default Layout;
