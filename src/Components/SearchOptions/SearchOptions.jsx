import React from "react";
import { Button } from "react-bootstrap";

import styled from "./SearchOptions.module.css";

const SearchOptions = ({ moveLeft, locationsFetch, onClickedSearchedResult, optionToShow }) => {
  return (
    <ul className={`${styled.searchList} ${moveLeft && styled.moveLeft}`}>
      {locationsFetch?.searchResults?.map(({ location, _id }) => (
        <li key={_id} className={styled.searchListOption}>
          <Button
            className={styled.searchListBtn}
            onClick={() =>
              optionToShow === "pickUp"
                ? onClickedSearchedResult({ pickUp: location, pickUpID: _id })
                : onClickedSearchedResult({ dropOff: location, dropOffID: _id })
            }>
            {location}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default SearchOptions;
