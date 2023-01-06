import React from "react";
import Container from "react-bootstrap/Container";
import MyHead from "../../src/Components/MyHead/MyHead";

export default function aboutUs() {
  return (
    <Container className="mt-5">
      <MyHead title="About Us" noIndex />
      <h1>Welcome to Vacations Taxis!</h1>
      <p>
        We are a premier transportation company dedicated to providing top-notch taxi services to
        travelers around the Dominican Republic. Our team is composed of experienced and
        professional drivers who are committed to making your travel experience smooth and
        enjoyable.
      </p>
      <p>
        Our fleet of vehicles is carefully maintained to ensure your safety and comfort. Whether you
        need a simple airport transfer or a more complex itinerary, we have the expertise and
        resources to meet your needs.
      </p>
      <p>
        At Vacations Taxis, we take pride in our attention to detail and customer service. We
        understand that your time is valuable, which is why we offer convenient online booking and a
        24/7 customer service hotline for any questions or concerns you may have.
      </p>
      <p>
        We look forward to serving you on your next trip and helping you make the most of your
        vacation. Thank you for choosing Vacations Taxis!
      </p>
    </Container>
  );
}
