import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";

import styled from "./SharedCarsList.module.css";

const SharedCarsList = () => {
  // Define the locations grouped by their respective areas
  const locations = [
    {
      area: "Punta Cana",
      locations: [
        {
          name: "Punta Cana Area",
          pickup: "Punta cana",
          dropOff: "1677"
        }
        // Add more Punta Cana locations here
      ]
    },
    {
      area: "Samana",
      locations: [
        {
          name: "Samana Area",
          pickup: "Samana",
          dropOff: "1677"
        }
      ]
    },
    // Add more location groups here
    {
      area: "Santo Domingo",
      locations: [
        {
          name: "Santo Domingo Area",
          pickup: "Santo Domingo",
          dropOff: "1677"
        }
      ]
    },
    {
      area: "Puerto Plata",
      locations: [
        {
          name: "Puerto Plata",
          pickup: "Puerto plata",
          dropOff: "1677"
        }
      ]
    },

    {
      area: "Santiago",
      locations: [
        {
          name: "Santiago Area",
          pickup: "Santiago",
          dropOff: "1677"
        }
      ]
    }
  ];

  return (
    <Container>
      <Row className={styled.main}>
        {locations.map((locationGroup) => (
          <Col key={locationGroup.area} xs={12} md={6} lg={3}>
            <h3 className={styled.heading}>
              Carpool <p>in {locationGroup.area}</p>
            </h3>

            {locationGroup.locations.map((location) => (
              <p key={location.name}>
                <Link href={`/rideshare?pickUp=${location.pickup}`}>{location.name}</Link>
              </p>
            ))}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SharedCarsList;
