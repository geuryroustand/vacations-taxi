import Container from "react-bootstrap/Container";
import Markdown from "react-markdown";

const BookingConfirmation = ({ desc }) => {
  return (
    <Container style={{ marginTop: "2rem" }}>
      <Markdown>{desc}</Markdown>
    </Container>
  );
};

export default BookingConfirmation;
