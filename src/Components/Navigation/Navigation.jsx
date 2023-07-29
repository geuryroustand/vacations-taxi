import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

// import DiscountShowcase from "../DiscountShowcase/DiscountShowcase";
import styled from "./Navigation.module.css";
import Profile from "../Profile/Profile";

// TODO: Change the color to white of lines inside the dropdown

// TODO: Post a trip URL , the URL can be call requests

const Navigation = () => {
  return (
    <header>
      {/* <DiscountShowcase /> */}
      <Navbar className={styled["navbar-bg"]} expand="lg">
        <Container>
          <Navbar.Brand className={styled["logo-main"]} href="/">
            <span className={styled["logo-vacations-text"]}>Vacations</span>Taxis.com
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg-info"
            placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg-info">
                Information
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Profile id="drownDownBigScreen" />
                <NavDropdown title="Car Sharing" id="offcanvasNavbarDropdown-expand-lg-car-sharing">
                  {/* <Link href="/car-sharing"> */}
                  <NavDropdown.Item href="/find-car-sharing">Find a rideshare</NavDropdown.Item>
                  {/* </Link> */}
                  <NavDropdown.Divider />
                  {/* <Link href="/requests"> */}
                  <NavDropdown.Item href="/offer-seats">Post a trip</NavDropdown.Item>
                  {/* </Link> */}
                </NavDropdown>
                <NavDropdown title="Top locations" id="offcanvasNavbarDropdown-expand-lg-top">
                  <NavDropdown.Item href="/punta-cana-airport-transfers">
                    Punta Cana Airport (PUJ)
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/santo-domingo-airport-transfers">
                    Santo Domingo Airport (SDQ)
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/puerto-plata-airport-transfers">
                    Puerto Plata Airport (POP)
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/samana-el-catey-airport-transfers">
                    Samana El Catey Airport (AZS)
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/la-romana-airport-transfer">
                    La Romana Airport (LRM)
                  </NavDropdown.Item>
                  <a
                    href="/transportation-from-punta-cana-airport"
                    target="_blank"
                    className="sr-only">
                    Transportation from Punta Cana Airport
                  </a>
                  <a href="/punta-cana-airport-transportation" target="_blank" className="sr-only">
                    Punta cana airport transportation
                  </a>
                  <a href="/best-punta-cana-airport-transfers" target="_blank" className="sr-only">
                    Best Punta Cana airport transfers
                  </a>
                  <a
                    href="/dominican-republic-airport-transfers"
                    target="_blank"
                    className="sr-only">
                    Dominican Airport Transfers
                  </a>
                  <a
                    href="/puerto-plata-airport-transportation"
                    target="_blank"
                    className="sr-only">
                    Puerto Plata Airport Transportation
                  </a>
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
                  <NavDropdown.Item href="/la-isabela-airport-transfers-and-taxis">
                    La Isabela Airport (JBQ)
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Company" id="offcanvasNavbarDropdown-expand-lg-company">
                  <NavDropdown.Item href="/about-us">About Us</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/blogs">Blogs</NavDropdown.Item>
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
    </header>
  );
};

export default Navigation;
