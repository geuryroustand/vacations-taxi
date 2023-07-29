import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import styled from "./ContactTraveler.module.css";

const ContactTraveler = () => {
  return (
    <Form className={styled.form}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Send a message to Luis</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Eg: I want to share the ride with you..."
          rows={3}
        />
      </Form.Group>
      <Button className={styled.btnBg} type="submit" variant="primary">
        Send
      </Button>
    </Form>
  );
};

export default ContactTraveler;
