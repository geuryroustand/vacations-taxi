import dynamic from "next/dynamic";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import FallBackLoading from "../Loading/FallBackLoading";

import styled from "./RequestForm.module.css";

const DynamicFormGroup = dynamic(() => import("../FormGroup/FormGroup"), {
  loading: () => <FallBackLoading />
});
const DynamicRadioButtonGroup = dynamic(() => import("../RadioButtonGroup/RadioButtonGroup"), {
  loading: () => <FallBackLoading />
});

const DynamicTripDetailsInputs = dynamic(() => import("../TripDetailsInputs/TripDetailsInputs"), {
  loading: () => <FallBackLoading />
});

const RequestForm = ({
  postInfo,
  onChange,
  onSubmit,
  validated,
  currentDate,
  isLoadingToCreateRequestOrPost,
  contentData
}) => {
  const { requestOrPost, oneWayOrRoundTrip, travelInfo, hasFlight, airlineName, flightNumber } =
    postInfo;

  const {
    btnRequest,
    hasFlight: hasFlightContent,
    btnOffer,
    yes: yesContent,
    no: noContent,
    arrivalAirlineName,
    arrivalFlightNumber,
    travelerInfo,
    travelerInfoErrorMessage,
    btnLoadingState,
    travelerInfoPlacerHolder,
    radioBtnRequest,
    radioBtnOffer,
    oneWay,
    zone
  } = contentData?.attributes || {};

  const buttonText = requestOrPost === "request" ? btnRequest : btnOffer;

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <DynamicRadioButtonGroup
        radioBtnRequest={radioBtnRequest}
        radioBtnOffer={radioBtnOffer}
        oneWay={oneWay}
        requestOrPost={requestOrPost}
        oneWayOrRoundTrip={oneWayOrRoundTrip}
        onChange={onChange}
      />

      <DynamicTripDetailsInputs
        contentData={contentData}
        postInfo={postInfo}
        onChange={onChange}
        currentDate={currentDate}
      />

      <div className={styled.hasFlight}>
        <p>{hasFlightContent}</p>
        <Form.Check
          value="yes"
          checked={hasFlight === "yes"}
          type="radio"
          name="hasFlight"
          id="yes"
          label={yesContent}
          onChange={onChange}
        />
        <Form.Check
          value="no"
          checked={hasFlight === "no"}
          required
          type="radio"
          id="no"
          label={noContent}
          name="hasFlight"
          onChange={onChange}
        />
      </div>

      {hasFlight === "yes" && (
        <div className={styled.hasFlightInputs}>
          <Row>
            <Col md>
              <DynamicFormGroup
                label={arrivalAirlineName}
                id="airlineName"
                type="text"
                name="airlineName"
                placeholder={arrivalAirlineName}
                onChange={onChange}
                value={airlineName}
                asType={Col}
              />
            </Col>
            <Col md>
              <DynamicFormGroup
                label={arrivalFlightNumber}
                id="flightNumber"
                type="text"
                name="flightNumber"
                placeholder={arrivalFlightNumber}
                onChange={onChange}
                value={flightNumber}
                asType={Col}
              />
            </Col>
          </Row>
        </div>
      )}

      <Form.Select name="zone" onChange={onChange} className={styled.zone} aria-label="Which Zone?">
        <option>{zone}</option>
        <option value="puntaCana">Punta Cana</option>
        <option value="samana">Samana</option>
        <option value="santoDomingo">Santo Domingo</option>
        <option value="laRomana">La Romana</option>
        <option value="puertoPlata">Puerto Plata</option>
        <option value="santiago">Santiago</option>
        <option value="Other">Other</option>
      </Form.Select>

      <div className={styled.textArea}>
        <DynamicFormGroup
          label={travelerInfo}
          id="travelInfo"
          name="travelInfo"
          onChange={onChange}
          required
          errorMessage={travelInfo || travelerInfoErrorMessage}
          value={travelInfo}
          asType={Col}
          as="textarea"
          placeholder={travelerInfoPlacerHolder}
          numberOfRows={3}
          isLabelHidden
        />
      </div>
      <Button disabled={isLoadingToCreateRequestOrPost} className={styled.button} type="submit">
        {isLoadingToCreateRequestOrPost ? btnLoadingState : buttonText}
      </Button>
    </Form>
  );
};

export default RequestForm;
