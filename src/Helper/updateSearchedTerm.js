const updateSearchedTerm = ({
  pickUp,
  pickUpID,
  dropOff,
  dropOffID,
  setShowPickUpSearchedResult,
  setShowDropOffSearchedResult,
  searchedTerm,
  setSearchedTerm
}) => {
  const updatedSearchedTerm = pickUp
    ? {
        ...searchedTerm,
        pickUp,
        pickUpID,
        pickUpSearchedTermClicked: true
      }
    : {
        ...searchedTerm,
        dropOff,
        dropOffID,
        dropOffSearchedTermClicked: true
      };

  setSearchedTerm(updatedSearchedTerm);

  if (pickUp) {
    setShowPickUpSearchedResult((previous) => !previous);
  } else {
    setShowDropOffSearchedResult((previous) => !previous);
  }
};

export default updateSearchedTerm;
