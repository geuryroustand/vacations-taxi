import styled from "./TripDetails.module.css";

const TripDetails = ({ fontBiggest, airlineName, date, flightNumber, time }) => {
  return (
    <div className={styled.tripDetails}>
      <div>
        <p className={`${styled.boldInfo} ${fontBiggest && styled.fontBiggest}`}>Airline Name</p>
        <p>{airlineName}</p>

        <p className={`${styled.boldInfo} ${fontBiggest && styled.fontBiggest}`}>Date</p>
        <p>{date}</p>
      </div>

      <div>
        <p className={`${styled.boldInfo} ${fontBiggest && styled.fontBiggest}`}>Flight Number</p>
        <p>{flightNumber}</p>

        <p className={`${styled.boldInfo} ${fontBiggest && styled.fontBiggest}`}>Time</p>
        <p>{time}</p>
      </div>
    </div>
  );
};

export default TripDetails;
