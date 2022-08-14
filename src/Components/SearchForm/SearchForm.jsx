import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import styled from "./SearchForm.module.css";

import DatePickerSearchForm from "../DatePickerSearchForm/DatePickerSearchForm";
import SearchFormInput from "../SearchFormInput/SearchFormInput";

const SearchForm = ({ isClicked }) => {
  return (
    <Form className={styled.form}>
      <div className={styled["searchForm"]}>
        <SearchFormInput
          labelPick="Enter pick-up location"
          placeHolderPick="Enter pick-up location"
          labelDrop="Enter drop location"
          placeHolderDrop="Enter drop location "
        />
        <DatePickerSearchForm labelPickDate="arrival date" />

        {!isClicked && (
          <Button type="submit" className={styled["search-btn"]}>
            <Image src="/images/search.svg" width="25px" height="25px" alt="location" />
            Search
          </Button>
        )}
      </div>

      {isClicked && (
        <div className={`${styled["searchForm"]} ${styled["return-searchForm"]} `}>
          <SearchFormInput
            labelPick="Enter pick-up location"
            placeHolderPick="Enter pick-up location"
            labelDrop="Enter drop location"
            placeHolderDrop="Enter drop location "
          />

          <DatePickerSearchForm labelPickDate="departure date" />

          <Button type="submit" className={styled["search-btn"]}>
            <Image src="/images/search.svg" width="25px" height="25px" alt="location" />
            Search
          </Button>
        </div>
      )}
    </Form>
  );
};

export default SearchForm;
