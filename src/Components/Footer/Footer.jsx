import React from "react";
import Link from "next/link";

import Container from "react-bootstrap/Container";

import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaTripadvisor } from "react-icons/fa";

import styled from "./Footer.module.css";

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
  blogs
}) => {
  // TODO need to add the santiago airport content

  const { allRights, copyright } = footer[0]?.CopyRight[0] || {};
  const socialLinks = footer[0]?.SocialLinks || [];
  const followUs = footer[0]?.followUs || "";

  return (
    <footer className={styled.footer}>
      <Container>
        <ul className={styled.footerUl}>
          <li className={styled.footerList}>
            <h3 className={styled.heading}>{topLocationHeading}</h3>
            {topLocations?.map(({ id, label, link, hidden }) => (
              <Link key={id} href={link} className={hidden ? "sr-only" : ""}>
                {label}
              </Link>
            ))}
          </li>

          <li className={styled.footerList}>
            <h3 className={styled.heading}>{companyHeading}</h3>

            {company?.map(({ id, label, link }) => (
              <Link key={id} href={link}>
                {label}
              </Link>
            ))}

            <Link href={helpCenter?.link}>{helpCenter?.label}</Link>
            <Link href={blogs?.link}>{blogs?.label}</Link>
          </li>
        </ul>

        <div className={styled.socialMedia}>
          <h3 className={styled.socialMediaHeading}>{followUs}</h3>
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
