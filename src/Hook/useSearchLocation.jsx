/* eslint-disable react-hooks/exhaustive-deps */
import debounce from "lodash/debounce";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchLocations } from "../redux/SearchLocationEndpoints";

const useSearchLocation = (properties) => {
  const dispatch = useDispatch();

  const {
    searchedTerm,
    setSearchedTerm,
    setShowPickUpSearchedResult,
    setShowDropOffSearchedResult,
    inputPickUpReference,
    modalInputReference,
    inputDropOffReference
  } = properties;

  const searchLocation = debounce(async () => {
    if (
      (searchedTerm.valueTyped?.length > 2 &&
        searchedTerm.valueTyped === inputPickUpReference.current.value) ||
      (searchedTerm.valueTyped?.length > 2 &&
        searchedTerm.valueTyped === inputDropOffReference.current.value) ||
      (searchedTerm.valueTyped?.length > 2 &&
        searchedTerm.valueTyped === modalInputReference.current?.value)
    ) {
      dispatch(fetchLocations(searchedTerm.valueTyped));
    }
  }, 600);

  useEffect(() => {
    searchLocation();
  }, [searchedTerm.valueTyped]);

  const onChange = (event) => {
    setSearchedTerm({
      ...searchedTerm,
      valueTyped: event.target.value,
      [event.target.name]: event.target.value
    });

    if (event.target.name === "pickUp") {
      setShowPickUpSearchedResult(true);
    } else {
      setShowDropOffSearchedResult(true);
    }
  };

  return {
    onChange
  };
};

export default useSearchLocation;
