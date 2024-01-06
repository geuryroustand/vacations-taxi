import { useEffect } from "react";

const useSearchedTermUpdater = ({
  isClicked,
  disableReturnInputDate,
  pickUpMemoized,
  dropOffMemoized,
  currentReturnFormDate,
  currentDropOffDate,
  currentDropOffTime,
  searchedTerm,
  setSearchedTerm,
  format
}) => {
  useEffect(() => {
    if (isClicked || disableReturnInputDate) {
      setSearchedTerm({
        ...searchedTerm,
        pickUpReturn: pickUpMemoized || searchedTerm.dropOff,
        dropOffReturn: dropOffMemoized || searchedTerm.pickUp,
        dropOffDate: disableReturnInputDate
          ? format(currentReturnFormDate, "eee d, MMM  yyyy")
          : format(currentDropOffDate, "eee d, MMM  yyyy"),
        dropOffTime: disableReturnInputDate
          ? format(currentReturnFormDate, "k:m")
          : format(currentDropOffTime, "k:m"),
        roundtrip: true
      });
    } else {
      setSearchedTerm({
        pickUp: pickUpMemoized || searchedTerm.pickUp,
        dropOff: dropOffMemoized || searchedTerm.dropOff,
        pickUpDate: searchedTerm.pickUpDate,
        pickUpTime: searchedTerm.pickUpTime,
        pickUpSearchedTermClicked: true,
        dropOffSearchedTermClicked: true
      });
    }
  }, [
    isClicked,
    currentDropOffDate,
    currentDropOffTime,
    disableReturnInputDate,
    pickUpMemoized,
    dropOffMemoized,
    currentReturnFormDate,
    format,
    searchedTerm,
    setSearchedTerm
  ]);
};

export default useSearchedTermUpdater;
