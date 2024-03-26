import { BsClockHistory, BsShieldCheck } from "react-icons/bs";
import { FiDollarSign } from "react-icons/fi";
import { LuSofa } from "react-icons/lu";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styled from "./TrustedSharedRide.module.css";

const TrustedShareRide = ({ why, because = [] }) => {
  const icons = {
    fiDollarSign: <FiDollarSign className={styled.icons} />,
    bsClockHistory: <BsClockHistory className={styled.icons} />,
    luSofa: <LuSofa className={styled.icons} />,
    bsShieldCheck: <BsShieldCheck className={styled.icons} />
  };
  const { main, heading, rounderIcons } = styled;

  return (
    <section className={main}>
      <h2 className={heading}>{why}</h2>

      <Container>
        <Row>
          {because.map(({ description, iconName, id, rounderColor, title }) => (
            <Col key={id} xs={12} md={6} lg={3}>
              <div className={`${styled[rounderColor]} ${rounderIcons}`}>{icons[iconName]}</div>
              <h3 className={styled.title}>{title}</h3>
              <p>{description}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TrustedShareRide;
