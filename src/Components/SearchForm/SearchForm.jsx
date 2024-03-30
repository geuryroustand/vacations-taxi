import { useState, useRef } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

import Image from "next/image";
import styled from "./SearchForm.module.css";
import SearchOptions from "../SearchOptions/SearchOptions";
import FallBackLoading from "../Loading/FallBackLoading";
import flightDetailsSelector from "../../Helper/memoizedSelectors";
import useSearchTermUpdate from "../../Hook/useSearchTermUpdate";

import useSearchLocation from "../../Hook/useSearchLocation";
import submitBookingData from "../../Helper/submitBookingData";
import updateSearchedTerm from "../../Helper/updateSearchedTerm";

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

const SearchForm = ({ isRoundTrip, bookingSearch, showReturnSearchForm, isCarSharingPage }) => {
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

  // TODO need to fix the problem with the formatting of the dates and times

  // const selectedCurrentDropDateAndTime =
  //   router.query?.dropOffDate && router.query?.dropOffTime
  //     ? new Date(`${router.query?.dropOffDate} ${router.query?.dropOffTime}`)
  //     : undefined;

  const [currentReturnFormDate, setCurrentReturnFormDate] = useState(
    router.query?.dropOffDate && router.query?.dropOffTime ? new Date() : undefined
  );

  const [currentDropOffDate, setCurrentDropOffDate] = useState(new Date());
  const [currentDropOffTime, setCurrentDropOffTime] = useState(new Date());

  // const selectedCurrentPickUpDate =
  //   router.query?.pickUpDate && router.query?.pickUpTime
  //     ? new Date(`${router.query?.pickUpDate} ${router.query?.pickUpTime}`)
  //     : new Date();

  const [currentPickUpDate, setCurrentPickUpDate] = useState(new Date());
  const [currentPickUpTime, setCurrentPickUpTime] = useState(new Date());

  const [searchedTerm, setSearchedTerm] = useState({
    pickUp: "",
    dropOff: "",
    pickUpSearchedTermClicked: false,
    dropOffSearchedTermClicked: false,
    pickUpDate: "",
    pickUpTime: "",
    userValueTypeInTheModal: "",
    valueTyped: "",
    pickUpZone: "",
    dropOffZone: ""
  });

  const [disableReturnInputDate, setDisableReturnInputDate] = useState();

  useSearchTermUpdate({
    isRoundTrip,
    disableReturnInputDate,
    pickUpMemoized,
    dropOffMemoized,
    currentReturnFormDate,
    currentPickUpDate,
    currentPickUpTime,
    currentDropOffDate,
    currentDropOffTime,
    showReturnSearchForm,
    setSearchedTerm
  });

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

  const { submitData } = submitBookingData({
    isCarSharingPage,
    searchedTerm,
    passenger,
    setValidated,
    isRoundTrip,
    disableReturnInputDate
  });

  const { onChange } = useSearchLocation({
    searchedTerm,
    setSearchedTerm,
    inputPickUpReference,
    modalInputReference,
    inputDropOffReference,
    setShowPickUpSearchedResult,
    setShowDropOffSearchedResult
  });

  const onClickedSearchedResult = ({
    pickUp,
    pickUpID,
    dropOff,
    dropOffID,
    pickUpZone,
    dropOffZone
  }) => {
    if (!isDesktopOrLaptopOrTable) {
      setShowModal(false);
    }

    updateSearchedTerm({
      pickUp,
      pickUpID,
      dropOff,
      dropOffID,
      pickUpZone,
      dropOffZone,
      setShowPickUpSearchedResult,
      setShowDropOffSearchedResult,
      searchedTerm,
      setSearchedTerm
    });
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
              onClickedSearchedResult={onClickedSearchedResult}
              optionToShow="dropOff"
            />
          )}

        <DynamicDatePickerSearchForm
          isCarSharingPage={isCarSharingPage}
          disableReturnInputDate={disableReturnInputDate}
          setDisableReturnInputDate={setDisableReturnInputDate}
          showReturnSearchForm={showReturnSearchForm}
          isRoundTrip={isRoundTrip}
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

        {!isRoundTrip && (
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

        {isRoundTrip && !showReturnSearchForm && (
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

      {isRoundTrip && showReturnSearchForm && (
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
      {isRoundTrip && showReturnSearchForm && (
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
          onChange={onChange}
          onClickedSearchedResult={onClickedSearchedResult}
        />
      )}
    </Form>
  );
};

export default SearchForm;
