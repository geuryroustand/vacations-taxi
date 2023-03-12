import React from "react";
import Container from "react-bootstrap/Container";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaTripadvisor } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import styled from "./Footer.module.css";

const Footer = () => {
  const { t } = useTranslation("footer");
  return (
    <footer className={styled.footer}>
      <Container>
        <ul className={styled.footerUl}>
          <li className={styled.footerList}>
            <h3 className={styled.heading}>{t("heading1")}</h3>
            <Link href={t("link1")}>{t("link1Text")}</Link>
            <Link href={t("link2")}>{t("link2Text")}</Link>
            <Link href={t("link3")}>{t("link3Text")}</Link>
            <Link href={t("link4")}>{t("link4Text")}</Link>
            <Link href={t("link5")}>{t("link5Text")}</Link>
            <Link href={t("link6")}>{t("link6Text")}</Link>
            <Link href={t("link7")}>{t("link7Text")}</Link>

            <a href={t("link8")} rel="noreferrer" target="_blank" className="sr-only">
              {t("link8Text")}
            </a>
            <a href={t("link9")} rel="noreferrer" target="_blank" className="sr-only">
              {t("link9Text")}
            </a>
            <a href={t("link10")} rel="noreferrer" target="_blank" className="sr-only">
              {t("link10Text")}
            </a>
          </li>

          {/* <li className={styled.footerList}>
            <h3 className={styled.heading}>Services</h3>
            <Link href="/#how-we-work">How it Works</Link>
            <Link href="/">Shared Ride Information</Link>
          </li> */}

          <li className={styled.footerList}>
            <h3 className={styled.heading}>{t("heading2")}</h3>
            <Link href={t("link11")}>{t("link11Text")}</Link>
            <Link href={t("link12")}>{t("link12Text")}</Link>
            <Link href={t("link13")}>{t("link13Text")}</Link>
            <Link href={t("link14")}>{t("link14Text")}</Link>
          </li>
        </ul>

        <div className={styled.socialMedia}>
          <h3 className={styled.socialMediaHeading}>{t("socialMediaHeading")}</h3>
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

            <li>
              <a
                href="https://www.tripadvisor.com/Attraction_Review-g811253-d10500716-Reviews-VacationsTaxis-Santa_Barbara_de_Samana_Samana_Province_Dominican_Republic.html"
                target="_blank"
                rel="noreferrer"
                title="TripAdvisor">
                <FaTripadvisor />
              </a>
            </li>
          </ul>
        </div>

        <p className={styled.copyright}>
          {t("copyright")} &copy; vacationsTaxi.com&trade;. {t("rights")}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
