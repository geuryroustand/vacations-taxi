import dynamic from "next/dynamic";

import UserComment from "../UserComment/UserComment";

import styled from "./RideShareDetails.module.css";
import FallBackLoading from "../Loading/FallBackLoading";

import useDateTimeFormatter from "../../Hook/useDateTimeFormatter";

const DynamicTripDetails = dynamic(() => import("../TripDetails/TripDetails"), {
  loading: () => <FallBackLoading />
});

const RideShareDetails = ({ attributes = {} }) => {
  const { time, date, user, airlineName, flightNumber, travelInfo } = attributes;

  const { data } = user || {};
  const { username } = data?.attributes || "";

  const { formatTime, formatDate } = useDateTimeFormatter();

  return (
    <section className={styled.main}>
      <h2 className={styled.heading}>Passenger Request</h2>
      <UserComment userName={username} comment={travelInfo} />
      <h3 className={`${styled.heading} ${styled.headingDetails}`}>Flight Details</h3>
      <DynamicTripDetails
        airlineName={airlineName}
        date={formatDate(date)}
        flightNumber={flightNumber}
        time={formatTime(time)}
      />
    </section>
  );
};

export default RideShareDetails;
