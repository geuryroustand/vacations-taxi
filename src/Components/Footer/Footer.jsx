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
  DRLink
}) => {
  // TODO need to add the santiago airport content

  const { allRights, copyright } = footer[0]?.CopyRight[0] || {};
  const socialLinks = footer[0]?.SocialLinks || [];
  const followUs = footer[0]?.followUs || "";
  const { label: DRLabel = "", link: DRLinkFor = "" } = DRLink || {};
  const {
    query: { slug }
  } = useRouter();

  const showLink = `/${slug}` !== DRLinkFor;
  return (
    <footer className={styled.footer}>
      <Container>
        <div className={styled.footerLogoAndLink}>
          <p className={styled.footerLogo}>
            <span className={styled.footerLogoSpan}>Vacations</span>Taxis
          </p>

          {showLink && (
            <Link className={styled.footerInfoLink} href={`blog${DRLinkFor}`}>
              {DRLabel}
            </Link>
          )}
        </div>

        <ul className={styled.footerUl}>
          <li className={styled.footerList}>
            <h3 className={styled.heading}>{companyHeading}</h3>

            {company &&
              company?.map(({ id, label, link }) => (
                <Link key={id} href={link}>
                  {label}
                </Link>
              ))}

            <Link href={helpCenter?.link || "/"}>{helpCenter?.label}</Link>
            <Link href={blogs?.link || "/"}>{blogs?.label}</Link>
          </li>
          <li className={styled.footerList}>
            <h3 className={styled.heading}>{topLocationHeading}</h3>
            {topLocations &&
              topLocations?.map(({ id, label, link, hidden }) => (
                <Link key={id} href={link} className={hidden ? "sr-only" : ""}>
                  {label}
                </Link>
              ))}
          </li>
        </ul>

        <div className={styled.socialMedia}>
          <div className={styled.socialHeadingAndLanguages}>
            <h3 className={styled.socialMediaHeading}>{followUs}</h3>
            <DynamicLanguageSwitcher />
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
          {copyright} &copy; vacationsTaxi.com&trade;. {allRights}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
