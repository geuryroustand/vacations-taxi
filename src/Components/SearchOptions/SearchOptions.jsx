/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import styled from "./SearchOptions.module.css";

const data = [
  "Samana",
  "Las Terrenas",
  "Bahia Principe Portillo",
  "Bahia Principe Cayacoa",
  "Bahia Principe Cayacoa",
  "Bahia Principe Cayacoa",
  "Bahia Principe Cayacoa",
  "Bahia Principe Cayacoa"
];
const SearchOptions = ({ moveLeft, locationsFetch, onClickedSearchedResult, optionToShow }) => {
  const [filteredLocations, setFilteredLocations] = useState();

  return (
    <ul className={`${styled.searchList} ${moveLeft && styled.moveLeft}`}>
      {locationsFetch?.searchResults?.map(({ location, _id }) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <li
          key={_id}
          className={styled.searchListOption}
          onClick={() => {
            optionToShow === "pickUp"
              ? onClickedSearchedResult({ pickUp: location, pickUpID: _id })
              : onClickedSearchedResult({ dropOff: location, dropOffID: _id });
          }}>
          {location}
        </li>
      ))}
    </ul>
  );
};

export default SearchOptions;
