import React from "react";
import Container from "react-bootstrap/Container";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";

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

            <a href="/transportation-from-punta-cana-aiport" className="sr-only">
              Transportation from Punta Cana Airport
            </a>
            <a href="/punta-cana-airport-transportation" className="sr-only">
              Punta cana airport transportation
            </a>
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

        <div className={styled.socialMedia}>
          <h3 className={styled.socialMediaHeading}>Follow us on</h3>
          <ul className={styled.socialMediaList}>
            <li>
              <a
                href="https://www.facebook.com/vacationstaxis"
                target="_blank"
                rel="noreferrer"
                title="Facebook">
                <BsFacebook />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/vacationstaxis/?fbclid=IwAR03tVDCdWS4Ncff_HS8at53M_LVCPwz4JQBZrXNZIx5RNl8awSXgQ8ddsQ"
                target="_blank"
                rel="noreferrer"
                title="Instagram">
                <BsInstagram />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/vacations-taxis/"
                target="_blank"
                rel="noreferrer"
                title="Linkedin">
                <BsLinkedin />
              </a>
            </li>
          </ul>
        </div>

        <p className={styled.copyright}>
          Copyright &copy; vacationsTaxi.com&trade;. All rights reserved.{" "}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
