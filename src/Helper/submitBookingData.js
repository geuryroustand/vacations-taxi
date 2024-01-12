import { useRouter } from "next/router";

const submitBookingData = ({
  searchedTerm,
  passenger,
  setValidated,
  isRoundTrip,
  disableReturnInputDate
}) => {
  const router = useRouter();

  const submitData = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    const {
      dropOffReturn,
      pickUpReturn,
      roundtrip,
      dropOffID,
      pickUpID,
      pickUpDate,
      pickUpTime,
      dropOffDate,
      dropOffTime
    } = searchedTerm;

    const { pickUpPassenger, dropOffPassenger } = passenger;

    if (!form.checkValidity() === false) {
      if (isRoundTrip || disableReturnInputDate) {
        // if (
        //   (pickUpIDMemoized === router.query?.pickUp &&
        //     !pickUpID &&
        //     dropOffIDMemoized === router.query?.dropOff &&
        //     !dropOffID &&
        //     !disableReturnInputDate) ||
        //   (pickUpPassengerMemoized !== pickUpPassenger && !pickUpID)
        // ) {
        //   dispatch(
        //     allFlightInfo({
        //       ...allFlightInfoMemoized,
        //       ...searchedTerm,
        //       pickUpPassenger,
        //       dropOffPassenger
        //     })
        //   );
        //   return;
        // }

        router.push({
          pathname: "/booking-details",
          query: {
            pickUp: pickUpID || router.query?.pickUp,
            dropOff: dropOffID || router.query?.dropOff,
            dropOffDate,
            dropOffReturn,
            dropOffTime,
            pickUpDate,
            pickUpReturn,
            pickUpTime,
            pickUpPassenger,
            dropOffPassenger,
            roundtrip
          }
        });
      } else {
        // if (
        //   (pickUpIDMemoized === router.query?.pickUp &&
        //     !pickUpID &&
        //     dropOffIDMemoized === router.query?.dropOff &&
        //     !dropOffID) ||
        //   (pickUpPassengerMemoized !== pickUpPassenger && !pickUpID)
        // ) {
        //   dispatch(
        //     allFlightInfo({
        //       ...allFlightInfoMemoized,
        //       ...searchedTerm,
        //       pickUpPassenger,
        //       dropOffPassenger
        //     })
        //   );
        //   return;
        // }
        router.push({
          pathname: "/booking-details",
          query: {
            pickUp: pickUpID || router.query?.pickUp,
            dropOff: dropOffID || router.query?.dropOff,
            pickUpDate,
            pickUpReturn,
            pickUpTime,
            pickUpPassenger
          }
        });
      }
    }

    setValidated(true);
  };

  return {
    submitData
  };
};

export default submitBookingData;
