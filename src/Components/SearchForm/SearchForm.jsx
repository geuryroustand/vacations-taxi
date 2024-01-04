import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

import debounce from "lodash/debounce";
import format from "date-fns/format";

import Image from "next/image";
import styled from "./SearchForm.module.css";
import SearchOptions from "../SearchOptions/SearchOptions";
import FallBackLoading from "../Loading/FallBackLoading";
import flightDetailsSelector from "../../Helper/memoizedSelectors";

const Form = dynamic(() => import("react-bootstrap/Form"), {
  loading: () => <FallBackLoading />
});
const Button = dynamic(() => import("react-bootstrap/Button"), {
  loading: () => <FallBackLoading />
});

const DynamicModalBoots = dynamic(() => import("../Modal/Modal"), {
  loading: () => <FallBackLoading />
});

const DynamicSearchFormInput = dynamic(() => import("../SearchFormInput/SearchFormInput"), {
  loading: () => <FallBackLoading />
});

const DynamicDatePickerSearchForm = dynamic(
  () => import("../DatePickerSearchForm/DatePickerSearchForm"),
  {
    loading: () => <FallBackLoading />
  }
);

const SearchForm = ({ isClicked, bookingSearch, showReturnSearchForm }) => {
  const router = useRouter();

  const isDesktopOrLaptopOrTable =
    // eslint-disable-next-line unicorn/no-negated-condition
    typeof window !== "undefined"
      ? useMediaQuery({
          query: "(min-width:48rem)"
        })
      : false;

  const [passenger, setPassenger] = useState({
    pickUpPassenger: 1,
    dropOffPassenger: 1
  });

  const inputPickUpReference = useRef();
  const inputDropOffReference = useRef();
  const modalInputReference = useRef();

  const {
    pickUpMemoized,
    dropOffMemoized
    // pickUpIDMemoized,
    // dropOffIDMemoized,
    // allFlightInfoMemoized,
    // pickUpPassengerMemoized
  } = useSelector(flightDetailsSelector);

  const selectedCurrentDropDateAndTime =
    router.query?.dropOffDate && router.query?.dropOffTime
      ? new Date(`${router.query?.dropOffDate} ${router.query?.dropOffTime}`)
      : "";

  const [currentReturnFormDate, setCurrentReturnFormDate] = useState(
    selectedCurrentDropDateAndTime
  );

  const [currentDropOffDate, setCurrentDropOffDate] = useState(new Date());
  const [currentDropOffTime, setCurrentDropOffTime] = useState(new Date());

  const selectedCurrentPickUpDate =
    router.query?.pickUpDate && router.query?.pickUpTime
      ? new Date(`${router.query?.pickUpDate} ${router.query?.pickUpTime}`)
      : new Date();

  const [currentPickUpDate, setCurrentPickUpDate] = useState(new Date(selectedCurrentPickUpDate));
  const [currentPickUpTime, setCurrentPickUpTime] = useState(new Date());

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

  const [disableReturnInputDate, setDisableReturnInputDate] = useState();

  useEffect(() => {
    setSearchedTerm({
      ...searchedTerm,
      pickUpDate: currentPickUpDate && format(currentPickUpDate, "eee d, MMM  yyyy"),
      pickUpTime: showReturnSearchForm
        ? currentPickUpTime && format(currentPickUpTime, "k:m")
        : currentPickUpDate && format(currentPickUpDate, "k:m")
    });
  }, [currentPickUpDate, currentPickUpTime]);

  useEffect(() => {
    if (isClicked || disableReturnInputDate) {
      setSearchedTerm({
        ...searchedTerm,
        pickUpReturn: pickUpMemoized || searchedTerm.dropOff,
        dropOffReturn: dropOffMemoized || searchedTerm.pickUp,
        dropOffDate: disableReturnInputDate
          ? format(currentReturnFormDate, "eee d, MMM  yyyy")
          : format(currentDropOffDate, "eee d, MMM  yyyy"),
        dropOffTime: disableReturnInputDate
          ? format(currentReturnFormDate, "k:m")
          : format(currentDropOffTime, "k:m"),
        roundtrip: true
      });
    } else {
      setSearchedTerm({
        pickUp: pickUpMemoized || searchedTerm.pickUp,
        dropOff: dropOffMemoized || searchedTerm.dropOff,
        pickUpDate: searchedTerm.pickUpDate,
        pickUpTime: searchedTerm.pickUpTime,
        pickUpSearchedTermClicked: true,
        dropOffSearchedTermClicked: true
      });
    }
  }, [
    isClicked,
    currentDropOffDate,
    currentDropOffTime,
    disableReturnInputDate,
    pickUpMemoized,
    dropOffMemoized,
    currentReturnFormDate
  ]);

  const {
    isEmptyFeedbackPickUp = "",
    isEmptyFeedbackDropOff = "",
    inputPickUpPlaceHolder = "",
    inputDropOffPlaceHolder = "",
    passengers = "",
    searchBtn: searchButton = "",
    pickUpText = "",
    dateLabelArrival = "",
    dateLabelDeparture = ""
  } = bookingSearch || {};

  const [validated, setValidated] = useState(false);

  const [showPickUpSearchedResult, setShowPickUpSearchedResult] = useState(false);
  const [showDropOffSearchedResult, setShowDropOffSearchedResult] = useState(false);

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
        // if (
        //   (pickUpIDMemoized === router.query?.pickUp &&
        //     !pickUpID &&
        //     dropOffIDMemoized === router.query?.dropOff &&
        //     !dropOffID &&
        //     !disableReturnInputDate) ||
        //   (pickUpPassengerMemoized !== pickUpPassenger && !pickUpID)
        // ) {
        //   dispatch(
        //     allFlightInfo({
        //       ...allFlightInfoMemoized,
        //       ...searchedTerm,
        //       pickUpPassenger,
        //       dropOffPassenger
        //     })
        //   );
        //   return;
        // }
        router.push({
          pathname: "/booking-details",
          query: {
            pickUp: pickUpID || router.query?.pickUp,
            dropOff: dropOffID || router.query?.dropOff,
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
        // if (
        //   (pickUpIDMemoized === router.query?.pickUp &&
        //     !pickUpID &&
        //     dropOffIDMemoized === router.query?.dropOff &&
        //     !dropOffID) ||
        //   (pickUpPassengerMemoized !== pickUpPassenger && !pickUpID)
        // ) {
        //   dispatch(
        //     allFlightInfo({
        //       ...allFlightInfoMemoized,
        //       ...searchedTerm,
        //       pickUpPassenger,
        //       dropOffPassenger
        //     })
        //   );
        //   return;
        // }

        router.push({
          pathname: "/booking-details",
          query: {
            pickUp: pickUpID || router.query?.pickUp,
            dropOff: dropOffID || router.query?.dropOff,
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
    noSearch: true,
    isLoading: false,
    isError: false
  });

  const searchLocation = debounce(async () => {
    if (
      (searchedTerm.valueTyped?.length > 2 &&
        searchedTerm.valueTyped === inputPickUpReference.current.value) ||
      (searchedTerm.valueTyped?.length > 2 &&
        searchedTerm.valueTyped === inputDropOffReference.current.value) ||
      (searchedTerm.valueTyped?.length > 2 &&
        searchedTerm.valueTyped === modalInputReference.current?.value)
    ) {
      try {
        const PROD = process.env.NODE_ENV === "production";

        setLocationsFetch({ isLoading: true });
        // const response = await fetch(
        //   `${
        //     PROD
        //       ? `${process.env.NEXT_PUBLIC_API_PROD_URL}/locations/search`
        //       : `${process.env.NEXT_PUBLIC_API_DEV_URL}/locations/search`
        //   }`,

        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json"
        //     },

        //     body: JSON.stringify({
        //       location: searchedTerm.valueTyped.trim()
        //     })
        //   }
        // );

        const response = await fetch(
          `${
            PROD
              ? `${
                  process.env.NEXT_PUBLIC_API_PROD_URL
                }/locations/search?location=${searchedTerm.valueTyped.trim()}`
              : `${
                  process.env.NEXT_PUBLIC_API_DEV_URL
                }/locations/search?location=${searchedTerm.valueTyped.trim()}`
          }`
        );
        if (!response.ok) throw new Error("Not found ,Contact us here to help you");

        const getDestinations = await response.json();

        setLocationsFetch({
          ...locationsFetch,
          isLoading: false,
          isError: false,
          searchResults: getDestinations,
          noSearch: !false
        });
      } catch (error) {
        console.log(error);
        setLocationsFetch({
          isLoading: false,
          noSearch: true,
          isError: true
          // searchResults: [{ location: error.message }]
        });
      }
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
    <Form className={styled.form} validated={validated} noValidate onSubmit={submitData}>
      <div
        className={`${styled.searchForm} ${showReturnSearchForm ? "" : styled.searchFormSpecify}`}>
        <DynamicSearchFormInput
          showReturnSearchForm={showReturnSearchForm}
          inputReference={inputPickUpReference}
          label={inputPickUpPlaceHolder}
          placeHolder={inputPickUpPlaceHolder}
          name="pickUp"
          id="formBasicPickLocation1"
          isEmptyFeedback={isEmptyFeedbackPickUp}
          required
          validated={validated}
          onClickInput={() =>
            !isDesktopOrLaptopOrTable &&
            searchInputClicked({
              title: inputPickUpPlaceHolder,
              label: inputPickUpPlaceHolder,
              placeHolder: inputPickUpPlaceHolder,
              optionToShow: "pickUp"
            })
          }
          onChange={onChange}
          searchedTerm={searchedTerm.pickUp || ""}

          // onKeyUp={debouncedSearchLocation}
        />

        {showPickUpSearchedResult &&
          isDesktopOrLaptopOrTable &&
          showPickUpSearchedResult &&
          searchedTerm.pickUp &&
          searchedTerm.valueTyped?.length > 1 && (
            <SearchOptions
              locationsFetch={locationsFetch}
              onClickedSearchedResult={onClickedSearchedResult}
              optionToShow="pickUp"
            />
          )}

        <DynamicSearchFormInput
          showReturnSearchForm={showReturnSearchForm}
          inputReference={inputDropOffReference}
          label={inputDropOffPlaceHolder}
          placeHolder={inputDropOffPlaceHolder}
          name="dropOff"
          id="formBasicDropLocation1"
          isEmptyFeedback={isEmptyFeedbackDropOff}
          required
          validated={validated}
          onClickInput={() =>
            !isDesktopOrLaptopOrTable &&
            searchInputClicked({
              title: inputDropOffPlaceHolder,
              label: inputDropOffPlaceHolder,
              placeHolder: inputDropOffPlaceHolder,
              optionToShow: "dropOff"
            })
          }
          onChange={onChange}
          // onKeyUp={searchLocation}
          searchedTerm={searchedTerm.dropOff || ""}
        />

        {showDropOffSearchedResult &&
          isDesktopOrLaptopOrTable &&
          searchedTerm.dropOff &&
          searchedTerm.valueTyped?.length > 1 && (
            <SearchOptions
              moveLeft
              locationsFetch={locationsFetch}
              onClickedSearchedResult={onClickedSearchedResult}
              optionToShow="dropOff"
            />
          )}

        <DynamicDatePickerSearchForm
          disableReturnInputDate={disableReturnInputDate}
          setDisableReturnInputDate={setDisableReturnInputDate}
          showReturnSearchForm={showReturnSearchForm}
          isClicked={isClicked}
          passengers={passengers}
          pickUpText={pickUpText}
          pickUpAndDropDate={currentPickUpDate}
          setPickUpAndDropDate={setCurrentPickUpDate}
          currentReturnFormDate={currentReturnFormDate}
          setCurrentReturnFormDate={setCurrentReturnFormDate}
          pickUpAndDropTime={currentPickUpTime}
          setPickUpAndDropTime={setCurrentPickUpTime}
          labelPickDate={dateLabelArrival}
          dateLabelDeparture={dateLabelDeparture}
          labelPickTime="arrival pick time"
          getPassenger={(event) =>
            setPassenger({
              ...passenger,
              pickUpPassenger: event.target.value
            })
          }
        />

        {!isClicked && (
          <Button
            type="submit"
            className={`${styled["search-btn"]} ${
              showReturnSearchForm ? "" : styled.searchBtnSpecify
            }`}>
            <Image
              src="/images/search.svg"
              width={showReturnSearchForm ? 25 : 20}
              height={showReturnSearchForm ? 25 : 20}
              alt="location"
            />
            {searchButton}
          </Button>
        )}

        {isClicked && !showReturnSearchForm && (
          <Button
            type="submit"
            className={`${styled["search-btn"]} ${
              showReturnSearchForm ? "" : styled.searchBtnSpecify
            }`}>
            <Image
              src="/images/search.svg"
              width={showReturnSearchForm ? 25 : 20}
              height={showReturnSearchForm ? 25 : 20}
              alt="search location"
            />
            {searchButton}
          </Button>
        )}
      </div>

      {isClicked && showReturnSearchForm && (
        <div className={`${styled.searchForm} ${styled["return-searchForm"]} `}>
          <DynamicSearchFormInput
            showReturnSearchForm={showReturnSearchForm}
            label={inputDropOffPlaceHolder}
            placeHolder={inputDropOffPlaceHolder}
            disabled
            searchedTerm={searchedTerm.dropOffSearchedTermClicked ? searchedTerm.dropOff : ""}
          />

          <DynamicSearchFormInput
            showReturnSearchForm={showReturnSearchForm}
            label={inputPickUpPlaceHolder}
            placeHolder={inputPickUpPlaceHolder}
            disabled
            searchedTerm={searchedTerm.pickUpSearchedTermClicked ? searchedTerm.pickUp : ""}
          />

          <DynamicDatePickerSearchForm
            showReturnSearchForm={showReturnSearchForm}
            pickUpText={pickUpText}
            passengers={passengers}
            pickUpAndDropDate={currentDropOffDate}
            setPickUpAndDropDate={setCurrentDropOffDate}
            pickUpAndDropTime={currentDropOffTime}
            setPickUpAndDropTime={setCurrentDropOffTime}
            labelPickDate={dateLabelDeparture}
            labelPickTime="departure pick time"
            defaultValue={passenger.pickUpPassenger}
            getPassenger={() =>
              setPassenger({
                ...passenger,
                dropOffPassenger: passenger.pickUpPassenger
              })
            }
          />
        </div>
      )}
      {isClicked && showReturnSearchForm && (
        <Button type="submit" className={styled["search-btn"]}>
          <Image src="/images/search.svg" width="25" height="25" alt="location" />
          {searchButton}
        </Button>
      )}

      {!isDesktopOrLaptopOrTable && (
        <DynamicModalBoots
          inputReference={modalInputReference}
          showModal={showModal}
          closeModal={closeModal}
          modalInputValues={modalInputValues}
          locationsFetch={locationsFetch}
          onChange={onChange}
          onClickedSearchedResult={onClickedSearchedResult}
        />
      )}
    </Form>
  );
};

export default SearchForm;
