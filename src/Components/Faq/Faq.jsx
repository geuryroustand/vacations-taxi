import React from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import styled from "./Faq.module.css";

const Faq = () => {
  return (
    <section className={styled.faq}>
      <h2 className={styled.heading}>Frequently Asked Questions</h2>
      <Container>
        <Accordion className={styled.accordion} defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>What type of transportation services do you offer?</Accordion.Header>
            <Accordion.Body>
              We offer a wide range of transportation services, including airport transfer, shuttle
              service, private car service, VIP and luxury transportation, and sightseeing tours.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              Do you offer transportation services to other destinations besides Punta Cana?
            </Accordion.Header>
            <Accordion.Body>
              Yes, we offer transportation services to other destinations in the Dominican Republic,
              such as Santo Domingo.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              What type of vehicles do you use for transportation?
            </Accordion.Header>
            <Accordion.Body>
              We use a variety of well-maintained vehicles, including sedans, SUVs, vans, and buses,
              depending on the size of your group and the type of service you choose.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              Do you offer child seats or booster seats for children?
            </Accordion.Header>
            <Accordion.Body>
              Yes, we offer child seats and booster seats for children upon request at no additional
              charge.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>What is your cancellation policy?</Accordion.Header>
            <Accordion.Body>
              We understand that plans can change, which is why we offer a flexible cancellation
              policy. If you cancel your booking more than 24 hours before the start of your
              journey, you will receive a full refund. If you cancel your booking within 15 hours of
              the start of your journey, you will be eligible for a refund of 60% of the total paid.
              Please contact us for more information on our specific policy.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>Are your drivers experienced and licensed?</Accordion.Header>
            <Accordion.Body>
              Yes, all of our drivers are experienced, licensed, and have a good knowledge of the
              area. They will provide you with a safe and comfortable transportation experience.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6">
            <Accordion.Header>What if my flight is early or delayed?</Accordion.Header>
            <Accordion.Body>
              if in case you experience any kinds of problems with your flight ternaries, you can
              inform us. We will try to adapt to your needs and pick you later or before. Your
              driver tracks your flight and waits for you if its delayed
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="7">
            <Accordion.Header>Do you have any other questions?</Accordion.Header>
            <Accordion.Body>
              <Link href="/contact-us" target="_blank">
                Contact Us
              </Link>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </section>
  );
};

export default Faq;
