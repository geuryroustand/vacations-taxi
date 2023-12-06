import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "next/image";
import Link from "next/link";
import styled from "./ContactForm.module.css";

const ContactForm = ({
  headingOne,
  headingTwo,
  name,
  nameFeedback,
  email,
  emailFeedback,
  shareEmail,
  textArea,
  textAreaFeedBack,
  submit,
  sentText,
  goBackText
}) => {
  const [validated, setValidated] = useState(false);
  const [infoSent, setInfoSent] = useState(false);

  const [inputValue, setInputValue] = useState({
    email: "",
    message: "",
    name: ""
  });
  const [message, setMessage] = useState([]);

  const submitInfo = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (!form.checkValidity() === false) {
      try {
        const PROD = process.env.NODE_ENV === "production";

        const response = await fetch(
          `${
            PROD
              ? `${process.env.NEXT_PUBLIC_API_PROD_URL}/contact-us`
              : `${process.env.NEXT_PUBLIC_API_DEV_URL}/contact-us`
          }`,

          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify(inputValue)
          }
        );

        if (!response.ok) {
          const errors = await response.json();
          setValidated(true);
          throw errors;
        }
        setInfoSent(true);
        setMessage([]);

        // TODO no show the form after submit it
      } catch (error) {
        setMessage(...error.error);
      }
    }

    setValidated(true);
  };

  const getUserInputValue = (event) => {
    setInputValue({
      ...inputValue,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className={styled.contact}>
      {infoSent ? (
        <div>
          <p className={styled.message}>{sentText}</p>
          <Link href="/">{goBackText}</Link>
        </div>
      ) : (
        <Form className={styled.form} noValidate validated={validated} onSubmit={submitInfo}>
          <h1>{headingOne}</h1>
          <h2>{headingTwo}</h2>
          <Form.Group className="mb-3" controlId="controlInputName">
            <Form.Label>{name}</Form.Label>
            <Form.Control
              onChange={getUserInputValue}
              value={inputValue.name}
              name="name"
              type="text"
              required
              placeholder={name}
            />
            <Form.Control.Feedback type="invalid">{nameFeedback}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="controlInputEmail">
            <Form.Label>{email}</Form.Label>
            <Form.Control
              onChange={getUserInputValue}
              name="email"
              type="email"
              value={inputValue.email}
              placeholder="jhon@gmail.com"
              required
            />
            {message.param === "email" ? (
              <p className="invalid-feedbackShow">{message?.msg}</p>
            ) : (
              <Form.Control.Feedback type="invalid">{emailFeedback}</Form.Control.Feedback>
            )}
            <Form.Text className="text-muted">{shareEmail}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="controlInputTexArea">
            <Form.Label>{textArea}</Form.Label>
            <Form.Control
              onChange={getUserInputValue}
              name="message"
              required
              value={inputValue.message}
              as="textarea"
              rows={3}
            />
            <Form.Control.Feedback type="invalid">{textAreaFeedBack}</Form.Control.Feedback>
          </Form.Group>

          <Button className={styled.submitBtn} type="submit">
            {submit}
          </Button>
        </Form>
      )}

      <div>
        <div className={styled.contactImg}>
          <Image src="/images/contactForm.svg" width="345" height="247" alt="contact us" />
        </div>

        <address>
          <div className={styled.address}>
            <Image src="/images/locationContact.svg" width="30" height="30" alt="location" />
            <p>
              Avenida La Marina Malecón, s/n; PO Box: 32000 – Santa Barbara de Samana – Samana
              Province - Dominican Republic
            </p>
          </div>

          <div className={styled.address}>
            <Image src="/images/tel.svg" width="30" height="30" alt="location" />
            <p>
              <a href="tel:+18094536714">+1 (809) 453-6714 (DR)</a> <br />
              <a
                href="tel:+13608607857
">
                +1 (703) 659-2119(USA)
              </a>
            </p>
          </div>

          <div className={styled.address}>
            <Image src="/images/email.svg" width="30" height="30" alt="location" />
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
