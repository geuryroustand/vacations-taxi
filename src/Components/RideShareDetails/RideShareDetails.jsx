import TripDetails from "../TripDetails/TripDetails";
import UserComment from "../UserComment/UserComment";

import styled from "./RideShareDetails.module.css";

const RideShareDetails = () => {
  return (
    <section className={styled.main}>
      <h2 className={styled.heading}>Passenger Request</h2>
      <UserComment
        userName="John Does"
        comment=" Hi, I'm looking for 1 or 2 people who want to share the transportation with 2 more
          people."
      />
      <h3 className={`${styled.heading} ${styled.headingDetails}`}>Flight Details</h3>
      <TripDetails
        fontBiggest
        airlineName="Air Canada"
        date="Sat, 30 April 2022"
        flightNumber="AD530"
        time="21:00 pm"
      />
    </section>
  );
};

export default RideShareDetails;
