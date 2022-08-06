import React from "react";
import { Container } from "react-bootstrap";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
