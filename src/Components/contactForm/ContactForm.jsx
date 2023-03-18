import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "next/image";

import styled from "./ContactForm.module.css";

const ContactForm = () => {
  const [validated, setValidated] = useState(false);

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
        <h1>Get In Touch</h1>
        <h2>We are here to help you! How can we help you?</h2>
        <Form.Group className="mb-3" controlId="controlInputName">
          <Form.Label>Enter your name</Form.Label>
          <Form.Control type="text" required placeholder="Enter your name" />
          <Form.Control.Feedback type="invalid">Please provide your name.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="controlInputEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="jhon@gmail.com" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            We ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="controlInputTexArea">
          <Form.Label>Your message</Form.Label>
          <Form.Control required as="textarea" rows={3} />
          <Form.Control.Feedback type="invalid">Please provide your request.</Form.Control.Feedback>
        </Form.Group>

        <Button className={styled.submitBtn} type="submit">
          Submit
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
              <a href="tel:+18094536714">+1 (809) 453-6714 (DR)</a> <br />
              <a
                href="tel:+13608607857
">
                +1 (360) 860-7857 (USA)
              </a>
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
