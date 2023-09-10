import React from "react";
import Form from "react-bootstrap/Form";
import styled from "./FormGroup.module.css";

const FormGroup = ({
  label,
  placeholder,
  id,
  type,
  formButtonText,
  name,
  onChange,
  errorMessage,
  required,
  isInvalid
}) => {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label className="visually-hidden ">{label}</Form.Label>
      <Form.Control
        onChange={onChange}
        className={styled.input}
        type={type}
        placeholder={placeholder}
        name={name}
        required={required}
        isInvalid={isInvalid}
      />
      {formButtonText && <Form.Text className="text-muted">{formButtonText}</Form.Text>}

      <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormGroup;
