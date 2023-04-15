import React from "react";

import dynamic from "next/dynamic";
import FallBackLoading from "../Loading/FallBackLoading";

const DynamicFooter = dynamic(() => import("../Footer/Footer"), {
  loading: () => <FallBackLoading />
});
const DynamicNavigation = dynamic(() => import("../Navigation/Navigation"), {
  loading: () => <FallBackLoading />
});

const Layout = ({ children }) => {
  return (
    <>
      <DynamicNavigation />
      <main className="main">{children}</main>
      <DynamicFooter />
    </>
  );
};

export default Layout;
