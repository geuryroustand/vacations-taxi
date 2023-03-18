import Link from "next/link";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import styled from "./Navigation.module.css";

const Navigation = () => {
  return (
    <Navbar className={styled["navbar-bg"]} expand="lg">
      <Container>
        <Link href="/">
          <Navbar.Brand className={styled["logo-main"]} href="/">
            <span className={styled["logo-vacations-text"]}>Vacations</span>Taxis.com
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg-info">Information</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavDropdown title="Top locations" id="offcanvasNavbarDropdown-expand-lg-top">
                <NavDropdown.Item href="/punta-cana-airport-transfers">
                  Punta Cana Airport (PUJ)
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/santo-domingo-aiport-transfers">
                  Santo Domingo Airport (SDQ)
                </NavDropdown.Item>
                {/* <NavDropdown.Item href="/santo-domingo-aiport-transfers">
                  Puerto Plata Airport (POP)
                </NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item href="/samana-el-catey-airport-transfers">
                  Samana Airport (AZS)
                </NavDropdown.Item>

                {/* <NavDropdown.Item href="/samana-el-catey-airport-transfers">
                La Romana Airport (LRM)
                </NavDropdown.Item> */}

                {/* <NavDropdown.Item href="/samana-el-catey-airport-transfers">
               Santiago Cibao Airport (STI)
                </NavDropdown.Item> */}

                {/* <NavDropdown.Item href="/samana-el-catey-airport-transfers">
               Santiago Cibao Airport (STI)
                </NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item href="/la-isabella-airport-transfers-and-taxis">
                  La Isabela Airport (JBQ)
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Company" id="offcanvasNavbarDropdown-expand-lg-company">
                <NavDropdown.Item href="/about-us">About Us</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/privacy-notice">Privacy Notice</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/terms-and-conditions">
                  Terms and Conditions
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/contact-us">Help Center</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Navigation;
