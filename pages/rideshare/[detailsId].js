import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import RideShareDetails from "../../src/Components/RideShareDetails/RideShareDetails";
import UserComments from "../../src/Components/UserComments/UserComments";
import styled from "./rideshare.module.css";
import MyHead from "../../src/Components/MyHead/MyHead";

export default function ridesDetails() {
  return (
    <div className={styled.main}>
      <MyHead title="Punta Cana Airport to Bahia Principe Punta Cana" noIndex />
      <Container>
        <div className={styled.textContainer}>
          <h1>
            Trip <span className={styled.details}>Details</span>
          </h1>
          <p>Punta Cana Airport to Bahia</p>
        </div>
        <Row>
          <Col>
            <RideShareDetails />
          </Col>
          <Col>
            <UserComments />
          </Col>
        </Row>
      </Container>
    </div>
  );
}