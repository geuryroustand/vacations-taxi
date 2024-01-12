import { useEffect } from "react";
import format from "date-fns/format";

const useSearchTermUpdate = ({
  isRoundTrip,
  disableReturnInputDate,
  pickUpMemoized,
  dropOffMemoized,
  currentReturnFormDate,
  currentPickUpDate,
  currentPickUpTime,
  currentDropOffDate,
  currentDropOffTime,
  showReturnSearchForm,
  setSearchedTerm
}) => {
  const shouldUpdateRoundTripTerms = isRoundTrip || disableReturnInputDate;

  const updateRoundTripTerms = (previousSearchTerm) => {
    return {
      ...previousSearchTerm,
      pickUpReturn: pickUpMemoized || previousSearchTerm.dropOff,
      dropOffReturn: dropOffMemoized || previousSearchTerm.pickUp,
      dropOffDate: disableReturnInputDate
        ? format(currentReturnFormDate, "eee d, MMM yyyy")
        : format(currentDropOffDate, "eee d, MMM yyyy"),
      dropOffTime: disableReturnInputDate
        ? format(currentReturnFormDate, "k:m")
        : format(currentDropOffTime, "k:m"),
      roundtrip: true
    };
  };

  const updateOneWayTerms = (previousSearchTerm) => {
    return {
      ...previousSearchTerm,
      pickUp: pickUpMemoized || previousSearchTerm.pickUp,
      dropOff: dropOffMemoized || previousSearchTerm.dropOff,
      pickUpDate: currentPickUpDate && format(currentPickUpDate, "eee d, MMM yyyy"),
      pickUpTime: showReturnSearchForm
        ? currentPickUpTime && format(currentPickUpTime, "k:m")
        : currentPickUpDate && format(currentPickUpDate, "k:m"),
      pickUpSearchedTermClicked: true,
      dropOffSearchedTermClicked: true
    };
  };

  const dependencies = [
    isRoundTrip,
    disableReturnInputDate,
    pickUpMemoized,
    dropOffMemoized,
    currentReturnFormDate,
    currentPickUpDate,
    currentPickUpTime,
    currentDropOffDate,
    currentDropOffTime,
    showReturnSearchForm,
    setSearchedTerm
  ];

  useEffect(() => {
    setSearchedTerm((previousSearchTerm) => {
      return shouldUpdateRoundTripTerms
        ? updateRoundTripTerms(previousSearchTerm)
        : updateOneWayTerms(previousSearchTerm);
    });
  }, dependencies);
};

export default useSearchTermUpdate;
