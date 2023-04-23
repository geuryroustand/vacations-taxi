import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import FallBackLoading from "../Loading/FallBackLoading";

const DynamicFooter = dynamic(() => import("../Footer/Footer"));
const DynamicNavigation = dynamic(() => import("../Navigation/Navigation"), {
  suspense: true
});

const Layout = ({ children }) => {
  return (
    <>
      <Suspense fallback={<FallBackLoading />}>
        <DynamicNavigation />
      </Suspense>
      <main className="main">{children}</main>
      <Suspense fallback={<FallBackLoading />}>
        <DynamicFooter />
      </Suspense>
    </>
  );
};

export default Layout;
