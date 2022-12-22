import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import styled from "./Navigation.module.css";

const Navigation = () => {
  return (
    <Navbar className={styled["navbar-bg"]} expand="lg">
      <Container>
        <Navbar.Brand className={styled["logo-main"]} href="/">
          <span className={styled["logo-vacations-text"]}>Vacations</span>Taxis.com
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* <Nav.Link href="/">Link</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/">Action</NavDropdown.Item>
              <NavDropdown.Item href="/">Another action</NavDropdown.Item>
              <NavDropdown.Item href="/">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
