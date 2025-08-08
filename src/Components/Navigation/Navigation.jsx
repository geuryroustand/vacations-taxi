import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";

import { FaCarSide } from "react-icons/fa6";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

import styled from "./Navigation.module.css";
import FallBackLoading from "../Loading/FallBackLoading";
import Profile from "../Profile/Profile";

const DynamicLanguageSwitcher = dynamic(() => import("../LanguageSwitcher/LanguageSwitcher"), {
  loading: () => <FallBackLoading />
});

const Navigation = ({
  companyHeading,
  topLocationHeading,
  topLocations,
  company,
  helpCenter,
  blogs,
  carpool,
  carpoolLinks,
  loginText,
  signUpText,
  signOutText,
  movilNavHeadingText,
  displayNot
}) => {
  const { locale } = useRouter();

  const localeLink = `${locale === "en" ? "" : `/${locale}`}`;

  return (
    <header style={displayNot ? { display: "none" } : { display: "block" }}>
      <Navbar className={styled["navbar-bg"]} expand="lg">
        <Container>
          <Navbar.Brand className={styled["logo-main"]} href={localeLink || "/"}>
            <span className={styled["logo-vacations-text"]}>Vacations</span>Taxis.com
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg-info"
            placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg-info">
                {movilNavHeadingText}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Profile
                  localeLink={localeLink}
                  loginText={loginText}
                  signUpText={signUpText}
                  signOutText={signOutText}
                  id="drownDownBigScreen"
                />
                <DynamicLanguageSwitcher id="header" />
                <NavDropdown
                  title={
                    <>
                      <FaCarSide size={16} className={styled.carpoolIcon} />
                      {carpool}
                    </>
                  }
                  id="offcanvasNavbarDropdown-expand-lg-shared-ride">
                  {carpoolLinks &&
                    carpoolLinks?.map(({ id, locations, slug }) => (
                      <NavDropdown.Item key={id} href={`${localeLink}${slug}`}>
                        {locations}
                      </NavDropdown.Item>
                    ))}
                </NavDropdown>
                <NavDropdown title={topLocationHeading} id="offcanvasNavbarDropdown-expand-lg-top">
                  {topLocations &&
                    topLocations?.map(({ id, label, link, hidden }, index) => (
                      <div key={id}>
                        {index !== 0 && (
                          <NavDropdown.Divider style={hidden ? { display: "none" } : {}} />
                        )}
                        <NavDropdown.Item
                          className={hidden && "sr-only"}
                          href={`${localeLink}${link}`}>
                          {label}
                        </NavDropdown.Item>
                      </div>
                    ))}
                </NavDropdown>
                <NavDropdown title={companyHeading} id="offcanvasNavbarDropdown-expand-lg-company">
                  {company &&
                    company?.map(({ id, label, link, hidden }, index) => (
                      <div key={id}>
                        {index !== 0 && (
                          <NavDropdown.Divider style={hidden && { display: "none" }} />
                        )}
                        <NavDropdown.Item
                          className={hidden && "sr-only"}
                          href={`${localeLink}${link}`}>
                          {label}
                        </NavDropdown.Item>
                      </div>
                    ))}
                </NavDropdown>
                <Nav.Link href={`${localeLink}${helpCenter?.link}`}>{helpCenter?.label}</Nav.Link>
                <Nav.Link href={`${localeLink}${blogs?.link}`}>{blogs?.label}</Nav.Link>
              </Nav>

              {/* Link seo total 7 */}
              <div className="sr-only">
                <Link href="https://www.playafronton.com">Playa Fronton</Link>
                <Link href="https://easypuntacanaairporttransfers.com">
                  Punta Cana Airport Transfers
                </Link>

                <Link href="https://www.dominicanpuntacana.com">Dominican Punta Cana</Link>
                <Link href="https://www.dominicanairporttransfersplus.com">
                  Dominican Airport Transfers
                </Link>

                <Link href="https://www.sauberkraft24.de">Gebäudereinigung Stuttgart</Link>
                <Link href="https://www.thingstodoinpuntacana.tours">
                  Things to do in Punta Cana
                </Link>
                <Link href="https://www.whalewatchingsamana.tours/">whale watching Samana Bay</Link>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Navigation;
