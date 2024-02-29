import Form from "react-bootstrap/Form";

import styled from "./FormSelect.module.css";

const FormSelect = ({ label, asType, onChange, value, valueName }) => {
  return (
    <Form.Group className="mb-3" as={asType} controlId="formSelect">
      <Form.Label>{label}</Form.Label>
      <Form.Select
        name={valueName}
        aria-label="Travelers"
        onChange={onChange}
        defaultValue={value}
        className={styled.input}>
        <option>Travelers</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </Form.Select>
    </Form.Group>
  );
};

export default FormSelect;
