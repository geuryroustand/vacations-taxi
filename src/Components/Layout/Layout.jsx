import React, { Suspense } from "react";

import dynamic from "next/dynamic";

const DynamicFooter = dynamic(() => import("../Footer/Footer"), {
  suspense: true
});
const DynamicNavigation = dynamic(() => import("../Navigation/Navigation"), {
  suspense: true
});

const Layout = ({ children }) => {
  return (
    <>
      <Suspense fallback="Loading...">
        <DynamicNavigation />
      </Suspense>

      <main>{children}</main>
      <Suspense fallback="Loading...">
        <DynamicFooter />
      </Suspense>
    </>
  );
};

export default Layout;
