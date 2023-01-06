import React, { useEffect, useState, Suspense, useRef } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMediaQuery } from "react-responsive";
import debounce from "lodash/debounce";
import format from "date-fns/format";

import Image from "next/image";
import styled from "./SearchForm.module.css";
import FallBackLoading from "../Loading/FallBackLoading";
import SearchOptions from "../SearchOptions/SearchOptions";

const DynamicModalBoots = dynamic(() => import("../Modal/Modal"), {
  suspense: true
});

const DynamicSearchFormInput = dynamic(() => import("../SearchFormInput/SearchFormInput"), {
  suspense: true
});

const DynamicDatePickerSearchForm = dynamic(
  () => import("../DatePickerSearchForm/DatePickerSearchForm"),
  {
    suspense: true
  }
);

const SearchForm = ({ isClicked }) => {
  const isDesktopOrLaptopOrTable =
    typeof window !== "undefined"
      ? useMediaQuery({
          query: "(min-width:48rem)"
        })
      : false;

  const [passenger, setPassenger] = useState({
    pickUpPassenger: 1,
    dropOffPassenger: 1
  });

  const inputReference = useRef();

  const [currentPickUpDate, setCurrentPickUpDate] = useState(new Date());
  const [currentPickUpTime, setCurrentPickUpTime] = useState(new Date());

  const [currentDropOffDate, setCurrentDropOffDate] = useState(new Date());
  const [currentDropOffTime, setCurrentDropOffTime] = useState(new Date());

  const [searchedTerm, setSearchedTerm] = useState({
    pickUp: "",
    dropOff: "",
    pickUpSearchedTermClicked: false,
    dropOffSearchedTermClicked: false,
    pickUpDate: "",
    pickUpTime: "",
    userValueTypeInTheModal: "",
    valueTyped: ""
  });

  const router = useRouter();

  useEffect(() => {
    setSearchedTerm({
      ...searchedTerm,
      pickUpDate: format(currentPickUpDate, "eee d, MMM  yyyy"),
      pickUpTime: format(currentPickUpTime, "k:m")
    });
  }, [currentPickUpDate, currentPickUpTime]);

  useEffect(() => {
    if (isClicked) {
      setSearchedTerm({
        ...searchedTerm,
        pickUpReturn: searchedTerm.dropOff,
        dropOffReturn: searchedTerm.pickUp,
        dropOffDate: format(currentDropOffDate, "eee d, MMM  yyyy"),
        dropOffTime: format(currentDropOffTime, "k:m"),
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
  }, [isClicked, currentDropOffDate, currentDropOffTime]);

  const [validated, setValidated] = useState(false);

  const [showPickUpSearchedResult, setShowPickUpSearchedResult] = useState(true);
  const [showDropOffSearchedResult, setShowDropOffSearchedResult] = useState(true);

  const [modalInputValues, setModalInputValues] = useState({});

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  const searchInputClicked = (inputClickedValue) => {
    setModalInputValues(inputClickedValue);
    setShowModal(true);
  };

  const submitData = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    const {
      dropOffReturn,
      pickUpReturn,
      roundtrip,
      dropOffID,
      pickUpID,
      pickUpDate,
      pickUpTime,
      dropOffDate,
      dropOffTime
    } = searchedTerm;

    const { pickUpPassenger, dropOffPassenger } = passenger;

    if (!form.checkValidity() === false) {
      if (roundtrip) {
        router.push({
          pathname: "/booking-details",
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
          pathname: "/booking-details",
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
    }

    setValidated(true);
  };

  const [locationsFetch, setLocationsFetch] = useState({
    searchResults: [],
    noSearch: true
  });

  const searchLocation = debounce(async () => {
    if (
      searchedTerm.valueTyped?.length > 3 &&
      searchedTerm.valueTyped === inputReference.current.value
    ) {
      try {
        const PROD = process.env.NODE_ENV === "production";

        const response = await fetch(
          `${
            PROD
              ? `${process.env.NEXT_PUBLIC_API_PROD_URL}/locations/search`
              : `${process.env.NEXT_PUBLIC_API_DEV_URL}/locations/search`
          }`,

          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({
              location: searchedTerm.valueTyped.trim()
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
  }, 600);

  useEffect(() => {
    searchLocation();
  }, [searchedTerm.valueTyped]);

  const onChange = (event) => {
    // if (event.target.value.length <= 2 && !isDesktopOrLaptopOrTable) setShowModal(true);
    setSearchedTerm({
      ...searchedTerm,
      valueTyped: event.target.value,
      [event.target.name]: event.target.value
    });

    // searchLocation(event);

    // if (!isDesktopOrLaptopOrTable && event.target.value !== "" && event.target.name === "pickUp") {
    //   searchInputClicked({
    //     title: "Pick-up location",
    //     label: "Enter pick-up location",
    //     placeHolder: "Enter pick-up location"
    //   });
    // }

    // if (!isDesktopOrLaptopOrTable && event.target.value !== "" && event.target.name === "dropOff") {
    //   searchInputClicked({
    //     title: "Drop-off location",
    //     label: "Enter drop location ",
    //     placeHolder: "Enter pick-up location"
    //   });
    // }

    if (event.target.name === "pickUp") {
      setShowPickUpSearchedResult(true);
    } else {
      setShowDropOffSearchedResult(true);
    }
  };

  const onClickedSearchedResult = ({ pickUp, pickUpID, dropOff, dropOffID }) => {
    if (!isDesktopOrLaptopOrTable) {
      setShowModal(false);
    }

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
    <Suspense fallback={<FallBackLoading />}>
      <Form className={styled.form} validated={validated} noValidate onSubmit={submitData}>
        <div className={styled.searchForm}>
          <DynamicSearchFormInput
            inputRef={inputReference}
            label="Enter pick-up location"
            placeHolder="Enter pick-up location"
            name="pickUp"
            id="formBasicPickLocation1"
            isEmptyFeedback="Please provide a pick-up location"
            required
            validated={validated}
            onClickInput={() =>
              !isDesktopOrLaptopOrTable &&
              searchInputClicked({
                title: "Pick-up location",
                label: "Enter pick-up location",
                placeHolder: "Enter pick-up location",
                optionToShow: "pickUp"
              })
            }
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

          <DynamicSearchFormInput
            inputRef={inputReference}
            label="Enter drop location"
            placeHolder="Enter drop location "
            name="dropOff"
            id="formBasicDropLocation1"
            isEmptyFeedback="Please provide a drop-off location"
            required
            validated={validated}
            onClickInput={() =>
              !isDesktopOrLaptopOrTable &&
              searchInputClicked({
                title: "Drop-off location",
                label: "Enter drop location ",
                placeHolder: "Enter pick-up location",
                optionToShow: "dropOff"
              })
            }
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

          <DynamicDatePickerSearchForm
            pickUpAndDropDate={currentPickUpDate}
            setPickUpAndDropDate={setCurrentPickUpDate}
            pickUpAndDropTime={currentPickUpTime}
            setPickUpAndDropTime={setCurrentPickUpTime}
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

            <DynamicSearchFormInput
              label="Enter drop location"
              placeHolder="Enter drop location"
              isEmptyFeedback="Please provide a pick-up location"
              disabled
              searchedTerm={searchedTerm.dropOffSearchedTermClicked ? searchedTerm.dropOff : ""}
            />

            <DynamicSearchFormInput
              label="Enter pick-up location"
              placeHolder="Enter pick-up location"
              isEmptyFeedback="Please provide a drop-off location"
              disabled
              searchedTerm={searchedTerm.pickUpSearchedTermClicked ? searchedTerm.pickUp : ""}
            />

            <DynamicDatePickerSearchForm
              pickUpAndDropDate={currentDropOffDate}
              setPickUpAndDropDate={setCurrentDropOffDate}
              pickUpAndDropTime={currentDropOffTime}
              setPickUpAndDropTime={setCurrentDropOffTime}
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

        <DynamicModalBoots
          inputRef={inputReference}
          showModal={showModal}
          closeModal={closeModal}
          modalInputValues={modalInputValues}
          locationsFetch={locationsFetch}
          onChange={onChange}
          onClickedSearchedResult={onClickedSearchedResult}
          // name={searchedTerm.pickUp.length === 1 ? "pickUp" : ""}
          // searchedTerm.dropOff.length === 1 && "dropOff"

          // searchedTerm={
          //   searchedTerm.pickUp
          //   // (searchedTerm.dropOff.length === 1 && searchedTerm.dropOff)
          // }
        />
      </Form>
    </Suspense>
  );
};

export default SearchForm;
