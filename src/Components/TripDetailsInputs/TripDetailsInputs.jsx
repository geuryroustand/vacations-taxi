import dynamic from "next/dynamic";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import FallBackLoading from "../Loading/FallBackLoading";

import styled from "./TripDetailsInputs.module.css";

const DynamicFormGroup = dynamic(() => import("../FormGroup/FormGroup"), {
  loading: () => <FallBackLoading />
});

const DynamicFormSelect = dynamic(() => import("../FormSelect/FormSelect"), {
  loading: () => <FallBackLoading />
});

const TripDetailsInputs = ({ postInfo, onChange, currentDate, contentData }) => {
  const {
    // pickUpLocation,
    // arrivalTime,
    // arrivalPrice,
    // departurePrice,
    // arrivalDate,
    // departureDate,
    // departureTime,
    // returnDropOffLocation,
    // returnPickUpLocation,
    // dropOffLocation,
    // arrivalQtyOfTraveler,
    // departureQtyOfTraveler,

    time,
    pickUp,
    dropOff,
    qtyOfTravelers,
    date,
    price,
    requestOrPost
  } = postInfo;

  const {
    tripHeading,
    arrivalDate,
    arrivalDateErrorMessage,
    arrivalTimeOffer,
    arrivalTimeRequest,
    arrivalTimeErrorMessage,
    arrivalPrice,
    arrivalPriceErrorMessage,
    pickUpLocation,
    pickUpLocationErrorMessage,
    pickUpLocationPlaceHolder,
    arrivalDropOffLocation,
    arrivalDropOffLocationPlacerHolder,
    arrivalDropOffLocationErrorMessage,
    arrivalQtyOfTravelerRequest,
    arrivalQtyOfTravelerOffer,
    arrivalTraveler
  } = contentData?.attributes || {};

  return (
    <>
      <div className={styled.tripDetails}>
        <h2>{tripHeading}</h2>
        <Row>
          <DynamicFormGroup
            label={arrivalDate}
            id="date"
            currentDate={currentDate}
            type="date"
            name="date"
            onChange={onChange}
            required
            errorMessage={date || arrivalDateErrorMessage}
            value={date}
            asType={Col}
            isLabelHidden
          />

          <DynamicFormGroup
            label={requestOrPost === "request" ? arrivalTimeRequest : arrivalTimeOffer}
            id="time"
            type="time"
            name="time"
            onChange={onChange}
            required
            errorMessage={time || arrivalTimeErrorMessage}
            value={time}
            asType={Col}
            isLabelHidden
          />
          {requestOrPost === "post" && (
            <Col md>
              <DynamicFormGroup
                label={arrivalPrice}
                id="price"
                type="number"
                name="price"
                onChange={onChange}
                required
                errorMessage={price || arrivalPriceErrorMessage}
                value={price}
                asType={Col}
                isLabelHidden
              />
            </Col>
          )}
        </Row>

        <Row>
          <Col md>
            <DynamicFormGroup
              label={pickUpLocation}
              id="pickUp"
              type="text"
              name="pickUp"
              placeholder={pickUpLocationPlaceHolder}
              onChange={onChange}
              required
              errorMessage={pickUp || pickUpLocationErrorMessage}
              value={pickUp}
              asType={Col}
              isLabelHidden
            />
          </Col>
          <Col md>
            <DynamicFormGroup
              label={arrivalDropOffLocation}
              id="dropOff"
              type="text"
              name="dropOff"
              placeholder={arrivalDropOffLocationPlacerHolder}
              onChange={onChange}
              required
              errorMessage={dropOff || arrivalDropOffLocationErrorMessage}
              value={dropOff}
              asType={Col}
              isLabelHidden
            />
          </Col>

          <Col md>
            <DynamicFormSelect
              arrivalTraveler={arrivalTraveler}
              onChange={onChange}
              value={qtyOfTravelers}
              valueName="qtyOfTravelers"
              asType={Col}
              label={
                requestOrPost === "request"
                  ? arrivalQtyOfTravelerRequest
                  : arrivalQtyOfTravelerOffer
              }
            />
          </Col>
        </Row>
      </div>

      {/* {oneWayOrRoundTrip === "roundTrip" && (
        <div className={styled.tripDetails}>
          <Row>
            <DynamicFormGroup
              label="When are you returning?"
              id="departureDate"
              currentDate={currentDate}
              type="date"
              name="departureDate"
              onChange={onChange}
              required
              errorMessage={departureDate || "Please provide a date."}
              value={departureDate}
              asType={Col}
              isLabelHidden
            />

            <DynamicFormGroup
              label={
                requestOrPost === "request"
                  ? "What time would you like to be picked up, or what is your flight arrival time?"
                  : " At what time will you pick passengers up?"
              }
              id="departureTime"
              type="time"
              name="departureTime"
              onChange={onChange}
              required
              errorMessage={departureTime || "Please provide the time."}
              value={departureTime}
              asType={Col}
              isLabelHidden
            />

            {requestOrPost === "post" && (
              <Col md>
                <DynamicFormGroup
                  label="What's your per-passenger rate in USD?"
                  id="departurePrice"
                  type="number"
                  name="departurePrice"
                  onChange={onChange}
                  required
                  errorMessage={departurePrice || "Please state your per-person charge."}
                  value={departurePrice}
                  asType={Col}
                  isLabelHidden
                />
              </Col>
            )}
          </Row>
          <Row>
            <Col md>
              <DynamicFormGroup
                label="Where are you leaving from?"
                id="returnPickUpLocation"
                type="text"
                name="returnPickUpLocation"
                placeholder="Return Pick-Up Location"
                onChange={onChange}
                required
                errorMessage={returnPickUpLocation || "Please provide a pick up location."}
                value={returnPickUpLocation}
                asType={Col}
                isLabelHidden
              />
            </Col>
            <Col md>
              <DynamicFormGroup
                label="Where would you like to be dropped off?"
                id="returnDropOffLocation"
                type="text"
                name="returnDropOffLocation"
                placeholder="Drop Location"
                onChange={onChange}
                required
                errorMessage={returnDropOffLocation || "Please provide a drop off location."}
                value={returnDropOffLocation}
                asType={Col}
                isLabelHidden
              />
            </Col>

            <Col md>
              <DynamicFormSelect
                onChange={onChange}
                value={departureqtyOfTravelers}
                valueName="departureQtyOfTraveler"
                asType={Col}
                label={
                  requestOrPost === "request"
                    ? "How many passengers will be with you?"
                    : "How many passengers can you take?"
                }
              />
            </Col>
          </Row>
        </div>
      )} */}
    </>
  );
};

export default TripDetailsInputs;
