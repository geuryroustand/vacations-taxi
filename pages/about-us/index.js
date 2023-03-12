import React from "react";
import Container from "react-bootstrap/Container";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MyHead from "../../src/Components/MyHead/MyHead";

export default function aboutUs() {
  const { t } = useTranslation("aboutUs");
  return (
    <Container className="mt-5">
      <MyHead title={t("pageTitle")} noIndex />

      <h1>{t("heading")}</h1>
      <p>{t("paragraph1")}</p>
      <p>{t("paragraph2")}</p>
      <p>{t("paragraph3")}</p>
      <p>{t("paragraph4")}</p>
    </Container>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["footer", "aboutUs"]))
    }
  };
}
