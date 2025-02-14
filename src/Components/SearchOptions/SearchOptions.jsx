import { useSelector } from "react-redux";
import Link from "next/link";
import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import styled from "./SearchOptions.module.css";

const SearchOptions = ({ moveLeft, onClickedSearchedResult, optionToShow }) => {
  const { searchResults, isLoading, isError } = useSelector((state) => state.searchFormSlice || {});

  return (
    <>
      {isError && (
        <ul className={`${styled.searchList} ${moveLeft && styled.moveLeft}`}>
          <li className={` ${styled.isError}`}>
            <Link href="/contact-us">Not found, contact us here to help you!</Link>
          </li>
        </ul>
      )}

      {isLoading && !isError && (
        <ul className={`${styled.searchList} ${moveLeft && styled.moveLeft}`}>
          <li className={styled.searchListOption}>
            <Spinner
              style={{ color: "var(--primary-color)" }}
              animation="border"
              role="status"
              size="lg"
            />
          </li>
        </ul>
      )}

      {!isLoading && !isError && (
        <ul className={`${styled.searchList} ${moveLeft && styled.moveLeft}`}>
          {searchResults?.map(({ location, _id, region }) => (
            <li key={_id} className={styled.searchListOption}>
              <Button
                className={styled.searchListBtn}
                onClick={() =>
                  optionToShow === "pickUp"
                    ? onClickedSearchedResult({
                        pickUp: location,
                        pickUpID: _id,
                        pickUpZone: region
                      })
                    : onClickedSearchedResult({
                        dropOff: location,
                        dropOffID: _id,
                        dropOffZone: region
                      })
                }>
                {location}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchOptions;
