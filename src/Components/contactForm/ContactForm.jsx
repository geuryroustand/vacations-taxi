import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import styled from "./ContactForm.module.css";

const ContactForm = () => {
  const [validated, setValidated] = useState(false);
  const { t } = useTranslation("contactUs");
  const submitInfo = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className={styled.contact}>
      <Form className={styled.form} noValidate validated={validated} onSubmit={submitInfo}>
        <h1>{t("heading1")} </h1>
        <h2>{t("heading2")}</h2>
        <Form.Group className="mb-3" controlId="controlInputName">
          <Form.Label>{t("name")}</Form.Label>
          <Form.Control type="text" required placeholder={t("name")} />
          <Form.Control.Feedback type="invalid">{t("nameFeedBack")}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="controlInputEmail">
          <Form.Label>{t("email")}</Form.Label>
          <Form.Control type="email" placeholder={t("emailPlaceholder")} required />
          <Form.Control.Feedback type="invalid">{t("emailFeedBack")}</Form.Control.Feedback>
          <Form.Text className="text-muted">{t("emailShareText")}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="controlInputTexArea">
          <Form.Label>{t("textareaLabel")}</Form.Label>
          <Form.Control required as="textarea" rows={3} />
          <Form.Control.Feedback type="invalid">{t("textareaFeedBack")}</Form.Control.Feedback>
        </Form.Group>

        <Button className={styled.submitBtn} type="submit">
          {t("buttonText")}
        </Button>
      </Form>

      <div>
        <div className={styled.contactImg}>
          <Image src="/images/contactForm.svg" width="345px" height="247px" alt="contact us" />
        </div>

        <address>
          <div className={styled.address}>
            <Image src="/images/locationContact.svg" width="30px" height="30px" alt="location" />
            <p>
              Avenida La Marina Malecón, s/n; PO Box: 32000 – Santa Barbara de Samana – Samana
              Province - Dominican Republic
            </p>
          </div>

          <div className={styled.address}>
            <Image src="/images/tel.svg" width="30px" height="30px" alt="location" />
            <p>
              <a href="tel:+809 864-1053">+1 (809) 864-1053 (DR)</a> <br />
              <a href="tel:+2392055572">+1 (239) 205-5572 (USA)</a>
            </p>
          </div>

          <div className={styled.address}>
            <Image src="/images/email.svg" width="30px" height="30px" alt="location" />
            <p>
              <a href="mailto:info@vacationstaxis.com">info@vacationstaxis.com</a> <br />
            </p>
          </div>
        </address>
      </div>
    </div>
  );
};

export default ContactForm;
