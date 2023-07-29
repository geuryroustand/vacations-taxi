import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ContactTraveler = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" placeholder="Contact to Thomas" rows={3} />
      </Form.Group>
      <Button type="submit" variant="primary">
        Send your message
      </Button>
    </Form>
  );
};

export default ContactTraveler;
