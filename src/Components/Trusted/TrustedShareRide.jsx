import { BsClockHistory, BsShieldCheck } from "react-icons/bs";
import { FiDollarSign } from "react-icons/fi";
import { LuSofa } from "react-icons/lu";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styled from "./TrustedSharedRide.module.css";

const getStyle = (rounderColor) => {
  switch (rounderColor) {
    case "first": {
      return { backgroundColor: "#808000" };
    }
    case "second": {
      return { backgroundColor: "#008080" };
    }
    case "third": {
      return { backgroundColor: "#ffb6c1" };
    }
    case "fourth": {
      return { backgroundColor: "var(--secondary-color)" };
    }
    default: {
      return {};
    }
  }
};

const TrustedShareRide = ({ why, because = [] }) => {
  const icons = {
    fiDollarSign: <FiDollarSign className={styled.icons} />,
    bsClockHistory: <BsClockHistory className={`${styled.icons} ${styled.secondIcon}`} />,
    luSofa: <LuSofa className={styled.icons} />,
    bsShieldCheck: <BsShieldCheck className={`${styled.icons} ${styled.fourthIcon}`} />
  };
  const { main, heading, rounderIcons, col } = styled;

  return (
    <section className={main}>
      <h2 className={heading}>{why}</h2>

      <Container>
        <Row>
          {because.map(({ description, iconName, id, rounderColor, title }) => (
            <Col className={col} key={id} xs={12} md={6} lg={3}>
              <div style={getStyle(rounderColor)} className={rounderIcons}>
                {icons[iconName]}
              </div>
              <h3 className={styled.title}>{title}</h3>
              <p className={styled.description}>{description}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TrustedShareRide;
