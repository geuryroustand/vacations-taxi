import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";

import Container from "react-bootstrap/Container";

import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaTripadvisor } from "react-icons/fa";

import styled from "./Footer.module.css";
import FallBackLoading from "../Loading/FallBackLoading";

const DynamicLanguageSwitcher = dynamic(() => import("../LanguageSwitcher/LanguageSwitcher"), {
  loading: () => <FallBackLoading />
});

const iconComponents = {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  FaTripadvisor
};

const Footer = ({
  footer,
  companyHeading,
  topLocationHeading,
  company,
  topLocations,
  helpCenter,
  blogs,
  DRLink,
  displayNot
}) => {
  // TODO need to add the santiago airport content

  const { allRights, copyright } = footer[0]?.CopyRight[0] || {};
  const socialLinks = footer[0]?.SocialLinks || [];
  const followUs = footer[0]?.followUs || "";

  const currentYear = new Date().getFullYear();

  const {
    query: { slug },
    locale
  } = useRouter();

  const localized = `${locale === "en" ? "" : `/${locale}`}`;

  const showLink = `/${slug}` !== DRLink?.link;
  return (
    <footer
      style={displayNot ? { display: "none" } : { display: "block" }}
      className={styled.footer}>
      <Container>
        <div className={styled.footerLogoAndLink}>
          <p className={styled.footerLogo}>
            <span className={styled.footerLogoSpan}>Vacations</span>Taxis
          </p>

          {showLink && DRLink && (
            <Link className={styled.footerInfoLink} href={`${localized}/blog${DRLink?.link || ""}`}>
              {DRLink?.label || ""}
            </Link>
          )}
        </div>

        <ul className={styled.footerUl}>
          <li className={styled.footerList}>
            <h3 className={styled.heading}>{companyHeading}</h3>

            {company &&
              company?.map(({ id, label, link }) => (
                <Link key={id} href={`${localized}${link}`}>
                  {label}
                </Link>
              ))}

            <Link className="sr-only" href="https://www.dominicanairporttransfersplus.com">
              Dominican Republic Airport Transfers
            </Link>
            <Link href="https://www.playafronton.com/" className="sr-only">
              playa fronton
            </Link>
            <Link className="sr-only" href="https://easypuntacanaairporttransfers.com">
              Punta Cana Airport Transfers
            </Link>
            <Link href={`${localized}${helpCenter?.link}` || "/"}>{helpCenter?.label}</Link>
            <Link href={`${localized}${blogs?.link}` || "/"}>{blogs?.label}</Link>
          </li>
          <li className={styled.footerList}>
            <h3 className={styled.heading}>{topLocationHeading}</h3>
            {topLocations &&
              topLocations?.map(({ id, label, link, hidden }) => (
                <Link key={id} href={`${localized}${link}`} className={hidden ? "sr-only" : ""}>
                  {label}
                </Link>
              ))}
          </li>
        </ul>

        <div className={styled.socialMedia}>
          <div className={styled.socialHeadingAndLanguages}>
            <h3 className={styled.socialMediaHeading}>{followUs}</h3>
            <DynamicLanguageSwitcher id="footer" />
          </div>
          <ul className={styled.socialMediaList}>
            {socialLinks.map(({ iconName, id, link, platform }) => {
              const IconComponent = iconComponents[iconName.trim()];
              return (
                <li key={id}>
                  <a href={link} target="_blank" rel="noreferrer" title={platform}>
                    <IconComponent />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <p className={styled.copyright}>
          {copyright} &copy; 2019-{currentYear} vacationsTaxis.com&trade;. {allRights}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
