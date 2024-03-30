import styled from "./TripDetails.module.css";

const TripDetails = ({
  fontBiggest,
  airlineName,
  date,
  flightNumber,
  time,
  airlineNameText,
  flightNumberText,
  dateText,
  timeText
}) => {
  return (
    <div className={styled.tripDetails}>
      <div>
        {airlineName && (
          <>
            <p className={`${styled.boldInfo} ${fontBiggest && styled.fontBiggest}`}>
              {airlineNameText}
            </p>
            <p>{airlineName}</p>
          </>
        )}

        <p className={`${styled.boldInfo} ${fontBiggest && styled.fontBiggest}`}>{dateText}</p>
        <p>{date}</p>
      </div>

      <div>
        {flightNumber && (
          <>
            <p className={`${styled.boldInfo} ${fontBiggest && styled.fontBiggest}`}>
              {flightNumberText}
            </p>
            <p>{flightNumber}</p>
          </>
        )}

        <p className={`${styled.boldInfo} ${fontBiggest && styled.fontBiggest}`}>{timeText}</p>
        <p>{time}</p>
      </div>
    </div>
  );
};

export default TripDetails;
