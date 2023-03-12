import React from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import { useTranslation } from "next-i18next";
import styled from "./Faq.module.css";

const Faq = () => {
  const { t } = useTranslation("faq");
  return (
    <section className={styled.faq}>
      <h2 className={styled.heading}>{t("heading")}</h2>
      <Container>
        <Accordion className={styled.accordion} defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{t("questions1")}</Accordion.Header>
            <Accordion.Body>{t("response1")}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>{t("questions2")}</Accordion.Header>
            <Accordion.Body>{t("response2")}</Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>{t("questions3")}</Accordion.Header>
            <Accordion.Body>{t("response3")}</Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>{t("questions4")}</Accordion.Header>
            <Accordion.Body>{t("response4")}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>{t("questions5")}</Accordion.Header>
            <Accordion.Body>{t("response5")}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>{t("questions6")}</Accordion.Header>
            <Accordion.Body>{t("response6")}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6">
            <Accordion.Header>{t("questions7")}</Accordion.Header>
            <Accordion.Body>{t("response7")}</Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="7">
            <Accordion.Header>{t("questions8")}</Accordion.Header>
            <Accordion.Body>
              <Link href="/contact-us" target="_blank">
                {t("response8")}
              </Link>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </section>
  );
};

export default Faq;
