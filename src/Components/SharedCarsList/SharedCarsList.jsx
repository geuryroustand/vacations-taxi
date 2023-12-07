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
          name: "Bahia Principe",
          pickup: "1234",
          dropOff: "1677"
        }
        // Add more Punta Cana locations here
      ]
    },
    {
      area: "Samana",
      locations: [
        {
          name: "Bahia Principe Samana",
          pickup: "1234",
          dropOff: "1677"
        },
        {
          name: "Bahia Principe Samana",
          pickup: "1234",
          dropOff: "1677"
        },
        {
          name: "Bahia Principe Samana",
          pickup: "1234",
          dropOff: "1677"
        },
        {
          name: "Bahia Principe Samana",
          pickup: "1234",
          dropOff: "1677"
        }
        // Add more Samana locations here
      ]
    },
    // Add more location groups here
    {
      area: "Santo Domingo",
      locations: [
        {
          name: "Bahia Principe",
          pickup: "1234",
          dropOff: "1677"
        }
        // Add more Punta Cana locations here
      ]
    },
    {
      area: "Puerto Plata",
      locations: [
        {
          name: "Bahia Principe",
          pickup: "1234",
          dropOff: "1677"
        }
        // Add more Punta Cana locations here
      ]
    },

    {
      area: "Santiago",
      locations: [
        {
          name: "Bahia Principe",
          pickup: "1234",
          dropOff: "1677"
        }
        // Add more Punta Cana locations here
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
                <Link href={`/pickup=${location.pickup}&dropOff=${location.dropOff}`}>
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
