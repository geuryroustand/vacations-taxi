/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-shadow
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { useMediaQuery } from "react-responsive";
import { debounce } from "lodash";
import { format } from "date-fns";

import Image from "next/image";
import styled from "./SearchForm.module.css";

import DatePickerSearchForm from "../DatePickerSearchForm/DatePickerSearchForm";
import SearchFormInput from "../SearchFormInput/SearchFormInput";

import ModalBoots from "../Modal/Modal";
import SearchOptions from "../SearchOptions/SearchOptions";

const SearchForm = ({ isClicked }) => {
  const isDesktopOrLaptopOrTable = true;

  // const isDesktopOrLaptopOrTable = useMediaQuery({
  //   query: "(min-width:48rem)"
  // });

  const [passenger, setPassenger] = useState({
    pickUpPassenger: 1,
    dropOffPassenger: 1
  });

  const [pickUpDate, setPickUpDate] = useState(new Date());
  const [pickUpTime, setPickUpTime] = useState(new Date());

  const [dropOffDate, setDropOffDate] = useState(new Date());
  const [dropOffTime, setDropOffTime] = useState(new Date());

  const [searchedTerm, setSearchedTerm] = useState({
    pickUp: "",
    dropOff: "",
    pickUpSearchedTermClicked: false,
    dropOffSearchedTermClicked: false,
    pickUpDate: "",
    pickUpTime: ""
  });

  const router = useRouter();

  useEffect(() => {
    setSearchedTerm({
      ...searchedTerm,
      pickUpDate: format(pickUpDate, "eee d, MMM  yyyy"),
      pickUpTime: format(pickUpTime, "k:m")
    });
  }, [pickUpDate, pickUpTime]);

  useEffect(() => {
    if (isClicked) {
      setSearchedTerm({
        ...searchedTerm,
        pickUpReturn: searchedTerm.dropOff,
        dropOffReturn: searchedTerm.pickUp,
        dropOffDate: format(dropOffDate, "eee d, MMM  yyyy"),
        dropOffTime: format(dropOffTime, "k:m"),
        roundtrip: true
      });
    } else {
      setSearchedTerm({
        pickUp: searchedTerm.pickUp,
        dropOff: searchedTerm.dropOff,
        pickUpDate: searchedTerm.pickUpDate,
        pickUpTime: searchedTerm.pickUpTime,
        pickUpSearchedTermClicked: true,
        dropOffSearchedTermClicked: true
      });
    }
  }, [isClicked, dropOffDate, dropOffTime]);

  const [validated, setValidated] = useState(false);

  const [showPickUpSearchedResult, setShowPickUpSearchedResult] = useState(true);
  const [showDropOffSearchedResult, setShowDropOffSearchedResult] = useState(true);

  const [inputValue, setInputValue] = useState({});

  const [show, setShow] = useState(false);

  const showModal = (inputClickedValue) => {
    setInputValue(inputClickedValue);
    setShow(true);
  };

  const closeModal = () => setShow(false);

  const submitData = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    const {
      dropOffDate,
      dropOffReturn,
      dropOffTime,

      pickUpDate,
      pickUpReturn,
      pickUpTime,

      roundtrip,

      dropOffID,
      pickUpID
    } = searchedTerm;

    const { pickUpPassenger, dropOffPassenger } = passenger;

    if (!form.checkValidity() === false) {
      if (roundtrip) {
        router.push({
          pathname: "/bookingDetails",
          query: {
            pickUp: pickUpID,
            dropOff: dropOffID,
            dropOffDate,
            dropOffReturn,
            dropOffTime,

            pickUpDate,
            pickUpReturn,
            pickUpTime,

            pickUpPassenger,
            dropOffPassenger,
            roundtrip
          }
        });
      } else {
        router.push({
          pathname: "/bookingDetails",
          query: {
            pickUp: pickUpID,
            dropOff: dropOffID,
            pickUpDate,
            pickUpReturn,
            pickUpTime,
            pickUpPassenger
          }
        });
      }
      // router.push({
      //   pathname: "/bookingDetails",
      //   query: {
      //     ...searchedTerm,

      //     ...passenger
      //   }
      // });
    }

    setValidated(true);
  };

  const [locationsFetch, setLocationsFetch] = useState({
    searchResults: [],
    noSearch: true
  });

  const searchLocation = useCallback(
    debounce(async (event) => {
      if (event.target.value.length > 3) {
        try {
          const response = await fetch(
            `http://localhost:3001/locations/search`,

            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },

              body: JSON.stringify({
                location: event.target.value.trim()
              })
            }
          );

          if (response.ok) {
            const getDestinations = await response.json();

            setLocationsFetch({
              ...locationsFetch,
              searchResults: getDestinations,
              noSearch: !false
            });
          }
        } catch (error) {
          console.log(error);
          setLocationsFetch({
            noSearch: true
          });
        }
      }
    }, 600),
    []
  );

  const onChange = (event) => {
    setSearchedTerm({
      ...searchedTerm,
      [event.target.name]: event.target.value
    });

    searchLocation(event);
    if (event.target.name === "pickUp") {
      setShowPickUpSearchedResult(true);
    } else {
      setShowDropOffSearchedResult(true);
    }
  };

  const onClickedSearchedResult = ({ pickUp, pickUpID, dropOff, dropOffID }) => {
    if (pickUp) {
      setSearchedTerm({
        ...searchedTerm,
        pickUp,
        pickUpID,
        pickUpSearchedTermClicked: true
      });
      setShowPickUpSearchedResult(!showPickUpSearchedResult);
    } else {
      setSearchedTerm({
        ...searchedTerm,
        dropOff,
        dropOffID,
        dropOffSearchedTermClicked: true
      });
      setShowDropOffSearchedResult(!showDropOffSearchedResult);
    }
  };

  return (
    <Form className={styled.form} validated={validated} noValidate onSubmit={submitData}>
      <div className={styled.searchForm}>
        <SearchFormInput
          label="Enter pick-up location"
          placeHolder="Enter pick-up location"
          name="pickUp"
          id="formBasicPickLocation1"
          isEmptyFeedback="Please provide a pick-up location"
          required
          validated={validated}
          onClickInput={() => {
            !isDesktopOrLaptopOrTable &&
              showModal({
                title: "Pick-up location",
                label: "Enter pick-up location",
                placeHolder: "Enter pick-up location"
              });
          }}
          onChange={onChange}
          searchedTerm={searchedTerm.pickUp || ""}
          // onKeyUp={debouncedSearchLocation}
        />

        {showPickUpSearchedResult &&
          isDesktopOrLaptopOrTable &&
          searchedTerm.pickUp &&
          showPickUpSearchedResult && (
            <SearchOptions
              locationsFetch={locationsFetch}
              onClickedSearchedResult={onClickedSearchedResult}
              optionToShow="pickUp"
            />
          )}

        <SearchFormInput
          label="Enter drop location"
          placeHolder="Enter drop location "
          name="dropOff"
          id="formBasicDropLocation1"
          isEmptyFeedback="Please provide a drop-off location"
          required
          validated={validated}
          onClickInput={() => {
            !isDesktopOrLaptopOrTable &&
              showModal({
                title: "Drop-off location",
                label: "Enter drop location ",
                placeHolder: "Enter pick-up location"
              });
          }}
          onChange={onChange}
          // onKeyUp={searchLocation}
          searchedTerm={searchedTerm.dropOff || ""}
        />

        {showDropOffSearchedResult && isDesktopOrLaptopOrTable && searchedTerm.dropOff && (
          <SearchOptions
            moveLeft
            locationsFetch={locationsFetch}
            onClickedSearchedResult={onClickedSearchedResult}
            optionToShow="dropOff"
          />
        )}

        {/* <SearchFormInput
          labelPick="Enter pick-up location"
          placeHolderPick="Enter pick-up location"
          labelDrop="Enter drop location"
          placeHolderDrop="Enter drop location "
          required={true}
          validated={validated}
        /> */}

        <DatePickerSearchForm
          pickUpAndDropDate={pickUpDate}
          setPickUpAndDropDate={setPickUpDate}
          pickUpAndDropTime={pickUpTime}
          setPickUpAndDropTime={setPickUpTime}
          labelPickDate="arrival date"
          labelPickTime="arrival pick time"
          getPassenger={(event) =>
            setPassenger({
              ...passenger,
              pickUpPassenger: event.target.value
            })
          }
        />

        {!isClicked && (
          <Button type="submit" className={styled["search-btn"]}>
            <Image src="/images/search.svg" width="25px" height="25px" alt="location" />
            Search
          </Button>
        )}
      </div>

      {isClicked && (
        <div className={`${styled.searchForm} ${styled["return-searchForm"]} `}>
          {/* <SearchFormInput
            labelPick="Enter pick-up location"
            placeHolderPick="Enter pick-up location"
            labelDrop="Enter drop location"
            placeHolderDrop="Enter drop location "
            disabled={true}
          /> */}

          <SearchFormInput
            label="Enter drop location"
            placeHolder="Enter drop location"
            isEmptyFeedback="Please provide a pick-up location"
            disabled
            searchedTerm={searchedTerm.dropOffSearchedTermClicked ? searchedTerm.dropOff : ""}
          />

          <SearchFormInput
            label="Enter pick-up location"
            placeHolder="Enter pick-up location"
            isEmptyFeedback="Please provide a drop-off location"
            disabled
            searchedTerm={searchedTerm.pickUpSearchedTermClicked ? searchedTerm.pickUp : ""}
          />

          <DatePickerSearchForm
            pickUpAndDropDate={dropOffDate}
            setPickUpAndDropDate={setDropOffDate}
            pickUpAndDropTime={dropOffTime}
            setPickUpAndDropTime={setDropOffTime}
            labelPickDate="departure date"
            labelPickTime="departure pick time"
            getPassenger={(event) =>
              setPassenger({
                ...passenger,
                dropOffPassenger: event.target.value
              })
            }
          />
        </div>
      )}
      {isClicked && (
        <Button type="submit" className={styled["search-btn"]}>
          <Image src="/images/search.svg" width="25px" height="25px" alt="location" />
          Search
        </Button>
      )}

      <ModalBoots
        show={show}
        closeModal={closeModal}
        inputValue={inputValue}
        locationsFetch={locationsFetch}
      />
    </Form>
  );
};

export default SearchForm;
