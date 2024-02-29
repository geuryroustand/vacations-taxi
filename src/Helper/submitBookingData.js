import { useRouter } from "next/router";

const submitBookingData = ({
  isCarSharingPage,
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
      dropOffTime,
      dropOff,
      pickUp
    } = searchedTerm;

    const { pickUpPassenger, dropOffPassenger } = passenger;

    if (!form.checkValidity() === false) {
      const pickUpInfo = isCarSharingPage ? pickUp : pickUpID || router.query?.pickUp;
      const dropOffInfo = isCarSharingPage ? dropOff : dropOffID || router.query?.dropOff;

      const queryParameters = {
        pickUp: pickUpInfo,
        dropOff: dropOffInfo,
        pickUpDate,
        pickUpTime,
        pickUpPassenger
      };

      if (isRoundTrip || disableReturnInputDate) {
        queryParameters.dropOffDate = dropOffDate;
        queryParameters.dropOffReturn = dropOffReturn;
        queryParameters.dropOffTime = dropOffTime;
        queryParameters.pickUpReturn = pickUpReturn;
        queryParameters.roundtrip = roundtrip;
        queryParameters.dropOffPassenger = dropOffPassenger;
      }

      const isOneWayOrCarSharingPage = isCarSharingPage ? "/rideshare" : "/booking-details";

      const routeConfig =
        isRoundTrip || disableReturnInputDate ? "/booking-details" : isOneWayOrCarSharingPage;

      router.push({
        pathname: routeConfig,
        query: queryParameters
      });
    }

    setValidated(true);
  };

  return {
    submitData
  };
};

export default submitBookingData;
