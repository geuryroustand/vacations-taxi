import dynamic from "next/dynamic";

import UserComment from "../UserComment/UserComment";

import styled from "./RideShareDetails.module.css";
import FallBackLoading from "../Loading/FallBackLoading";

import useDateTimeFormatter from "../../Hook/useDateTimeFormatter";

const DynamicTripDetails = dynamic(() => import("../TripDetails/TripDetails"), {
  loading: () => <FallBackLoading />
});

const RideShareDetails = ({
  attributes = {},
  tripInformation,
  passengerText,
  airlineNameText,
  flightNumberText,
  dateText,
  timeText
}) => {
  const { time, date, user, airlineName, flightNumber, travelInfo } = attributes;

  const { data } = user || {};
  const { username } = data?.attributes || "";

  const { formatTime, formatDate } = useDateTimeFormatter();

  return (
    <section className={styled.main}>
      <h2 className={styled.heading}>{passengerText}</h2>
      <UserComment userName={username} comment={travelInfo} />
      <h3 className={`${styled.heading} ${styled.headingDetails}`}>{tripInformation}</h3>
      <DynamicTripDetails
        airlineName={airlineName}
        date={formatDate(date)}
        flightNumber={flightNumber}
        time={formatTime(time)}
        airlineNameText={airlineNameText}
        flightNumberText={flightNumberText}
        dateText={dateText}
        timeText={timeText}
      />
    </section>
  );
};

export default RideShareDetails;
