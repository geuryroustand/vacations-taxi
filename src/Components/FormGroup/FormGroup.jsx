import React from "react";
import Form from "react-bootstrap/Form";
import styled from "./FormGroup.module.css";

const FormGroup = ({ label, placeholder, id, type, formButtonText }) => {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label className="visually-hidden ">{label}</Form.Label>
      <Form.Control className={styled.input} type={type} placeholder={placeholder} />
      {formButtonText && <Form.Text className="text-muted">{formButtonText}</Form.Text>}
    </Form.Group>
  );
};

export default FormGroup;
