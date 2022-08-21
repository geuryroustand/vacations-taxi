import React from "react";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
