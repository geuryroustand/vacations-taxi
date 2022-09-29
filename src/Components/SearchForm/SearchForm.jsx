import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import styled from "./SearchForm.module.css";

import DatePickerSearchForm from "../DatePickerSearchForm/DatePickerSearchForm";
import SearchFormInput from "../SearchFormInput/SearchFormInput";

import ModalBoots from "../Modal/Modal";
import SearchOptions from "../SearchOptions/SearchOptions";

const SearchForm = ({ isClicked }) => {
  const [validated, setValidated] = useState(false);
  const [inputValue, setInputValue] = useState({});

  const [show, setShow] = useState(false);
  const showModal = (inputClickedValue) => {
    setInputValue(inputClickedValue);
    setShow(true);
  };
  const closeModal = () => setShow(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const onChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
  };

  return (
    <Form className={styled.form} validated={validated} noValidate onSubmit={handleSubmit}>
      <div className={styled["searchForm"]}>
        <SearchFormInput
          label="Enter pick-up location"
          placeHolder="Enter pick-up location"
          name="pick-up"
          id="formBasicPickLocation1"
          isEmptyFeedback="Please provide a pick-up location"
          required={true}
          validated={validated}
          onClickInput={() =>
            showModal({
              title: "Pick-up location",
              label: "Enter pick-up location",
              placeHolder: "Enter pick-up location"
            })
          }
          onChange={onChange}
        />
        <SearchOptions />

        <SearchFormInput
          label="Enter drop location"
          placeHolder="Enter drop location "
          name="drop-off"
          id="formBasicDropLocation1"
          isEmptyFeedback="Please provide a drop-off location"
          required={true}
          validated={validated}
          onClickInput={() =>
            showModal({
              title: "Drop-off location",
              label: "Enter drop location ",
              placeHolder: "Enter pick-up location"
            })
          }
        />
        {/* <SearchFormInput
          labelPick="Enter pick-up location"
          placeHolderPick="Enter pick-up location"
          labelDrop="Enter drop location"
          placeHolderDrop="Enter drop location "
          required={true}
          validated={validated}
        /> */}

        <DatePickerSearchForm labelPickDate="arrival date" labelPickTime="arrival pick time" />

        {!isClicked && (
          <Button type="submit" className={styled["search-btn"]}>
            <Image src="/images/search.svg" width="25px" height="25px" alt="location" />
            Search
          </Button>
        )}
      </div>

      {isClicked && (
        <div className={`${styled["searchForm"]} ${styled["return-searchForm"]} `}>
          {/* <SearchFormInput
            labelPick="Enter pick-up location"
            placeHolderPick="Enter pick-up location"
            labelDrop="Enter drop location"
            placeHolderDrop="Enter drop location "
            disabled={true}
          /> */}

          <SearchFormInput
            label="Enter pick-up location"
            placeHolder="Enter pick-up location"
            isEmptyFeedback="Please provide a pick-up location"
            disabled={true}
          />

          <SearchFormInput
            label="Enter drop location"
            placeHolder="Enter drop location "
            isEmptyFeedback="Please provide a drop-off location"
            disabled={true}
          />

          <DatePickerSearchForm
            labelPickDate="departure date"
            labelPickTime="departure pick time"
          />
        </div>
      )}
      {isClicked && (
        <Button type="submit" className={styled["search-btn"]}>
          <Image src="/images/search.svg" width="25px" height="25px" alt="location" />
          Search
        </Button>
      )}

      <ModalBoots show={show} closeModal={closeModal} inputValue={inputValue} />
    </Form>
  );
};

export default SearchForm;
