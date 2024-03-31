import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";

import styled from "./SharedCarsList.module.css";

const SharedCarsList = ({ carpool, inText }) => {
  // Define the locations grouped by their respective areas
  const locations = [
    {
      area: "puntaCanaA",
      name: "Punta Cana",
      locations: [
        {
          name: "Punta Cana",
          pickup: "Punta cana",
          dropOff: "1677"
        }
        // Add more Punta Cana locations here
      ]
    },
    {
      area: "samanaA",
      name: "Samana",
      locations: [
        {
          name: "Samana",
          pickup: "Samana",
          dropOff: "1677"
        }
      ]
    },
    // Add more location groups here
    {
      area: "santoDomingoA",
      name: "Santo Domingo",
      locations: [
        {
          name: "Santo Domingo",
          pickup: "Santo Domingo",
          dropOff: "1677"
        }
      ]
    },
    {
      area: "puertoPlataA",
      name: "Puerto Plata",
      locations: [
        {
          name: "Puerto Plata",
          pickup: "Puerto plata",
          dropOff: "1677"
        }
      ]
    },

    {
      area: "santiagoA",
      name: "Santiago",
      locations: [
        {
          name: "Santiago",
          pickup: "Santiago",
          dropOff: "1677"
        }
      ]
    }
  ];

  return (
    <Container>
      <Row as="ul" className={styled.main}>
        {locations.map((locationGroup) => (
          <Col className={styled.list} as="li" key={locationGroup.area} xs={12} md={6} lg={3}>
            <h3 className={styled.heading}>
              {carpool}
              <p>
                {inText} {locationGroup.name}
              </p>
            </h3>

            {locationGroup.locations.map((location) => (
              <p key={location.name}>
                <Link href={`/rideshare?pickUp=${location.name}&pickUpZone=${locationGroup.area}`}>
                  {location.name}
                </Link>
              </p>
            ))}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SharedCarsList;
