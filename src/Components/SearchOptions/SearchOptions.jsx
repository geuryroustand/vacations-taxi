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
        <li
          key={_id}
          className={styled.searchListOption}
          onClick={() => {
            optionToShow === "pickUp"
              ? onClickedSearchedResult({ pickUp: location })
              : onClickedSearchedResult({ dropOff: location });
          }}>
          {location}
        </li>
      ))}
    </ul>
  );
};

export default SearchOptions;
