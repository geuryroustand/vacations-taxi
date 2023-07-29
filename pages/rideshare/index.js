import dynamic from "next/dynamic";
import Container from "react-bootstrap/Container";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import CardTripDetails from "../../src/Components/CardTripDetails/CardTripDetails";

import styled from "./rideshare.module.css";
import MyHead from "../../src/Components/MyHead/MyHead";

const DynamicSearchForm = dynamic(() => import("../../src/Components/SearchForm/SearchForm"), {
  loading: () => <FallBackLoading />
});

export default function rideShare() {
  return (
    <div className={styled.main}>
      <MyHead title="Punta Cana Airport to Bahia Principe Punta Cana" noIndex />
      <Container className={styled.container}>
        <DynamicSearchForm />
        <h1 className={styled.bigHeading}>From Punta Cana Airport to Bahia Principe Punta Cana</h1>
        <ul className={styled.list}>
          <CardTripDetails />
        </ul>
      </Container>
    </div>
  );
}
