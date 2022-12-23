import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import FallBackLoading from "../Loading/FallBackLoading";

const DynamicFooter = dynamic(() => import("../Footer/Footer"), {
  suspense: true
});
const DynamicNavigation = dynamic(() => import("../Navigation/Navigation"), {
  suspense: true
});

const Layout = ({ children }) => {
  return (
    <Suspense fallback={<FallBackLoading />}>
      <DynamicNavigation />
      <main className="main">{children}</main>
      <DynamicFooter />
    </Suspense>
  );
};

export default Layout;
