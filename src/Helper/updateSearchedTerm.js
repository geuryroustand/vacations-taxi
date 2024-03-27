const updateSearchedTerm = ({
  pickUp,
  pickUpID,
  dropOff,
  dropOffID,
  setShowPickUpSearchedResult,
  setShowDropOffSearchedResult,
  searchedTerm,
  setSearchedTerm,
  pickUpZone,
  dropOffZone
}) => {
  const updatedSearchedTerm = pickUp
    ? {
        ...searchedTerm,
        pickUp,
        pickUpID,
        pickUpSearchedTermClicked: true,
        pickUpZone
      }
    : {
        ...searchedTerm,
        dropOff,
        dropOffID,
        dropOffSearchedTermClicked: true,
        dropOffZone
      };

  setSearchedTerm(updatedSearchedTerm);

  if (pickUp) {
    setShowPickUpSearchedResult((previous) => !previous);
  } else {
    setShowDropOffSearchedResult((previous) => !previous);
  }
};

export default updateSearchedTerm;
