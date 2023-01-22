import React from "react";
import Container from "react-bootstrap/Container";

import Link from "next/link";
import styled from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styled.footer}>
      <Container>
        <ul className={styled.footerUl}>
          <li className={styled.footerList}>
            <h3 className={styled.heading}>Top locations</h3>
            <Link href="/punta-cana-airport-transfers">Punta Cana Airport (PUJ)</Link>
            <Link href="/santo-domingo-aiport-transfers">Santo Domingo Airport (SDQ)</Link>
            <Link href="/">Puerto Plata Airport (POP)</Link>
            <Link href="/samana-el-catey-airport-transfers">Samana Airport (AZS) </Link>
            <Link href="/">La Romana Airport (LRM) </Link>
            <Link href="/">Santiago Cibao Airport (STI) </Link>
            <Link href="/la-isabella-airport-transfers-and-taxis">La Isabela Airport (JBQ)</Link>
          </li>

          {/* <li className={styled.footerList}>
            <h3 className={styled.heading}>Services</h3>
            <Link href="/#how-we-work">How it Works</Link>
            <Link href="/">Shared Ride Information</Link>
          </li> */}

          <li className={styled.footerList}>
            <h3 className={styled.heading}>Company</h3>
            <Link href="/about-us">About Us</Link>
            <Link href="/contact-us">Help Center</Link>
            <Link href="/privacy-notice"> Privacy Notice</Link>
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
          </li>
        </ul>

        <p className={styled.copyright}>
          Copyright &copy; vacationsTaxi.com&trade;. All rights reserved.{" "}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
