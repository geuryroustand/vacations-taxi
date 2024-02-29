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
  isLoadingToCreateRequestOrPost
}) => {
  const { requestOrPost, oneWayOrRoundTrip, travelInfo, hasFlight, airlineName, flightNumber } =
    postInfo;

  const buttonText = requestOrPost === "request" ? "Post request " : "Post trip";

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <DynamicRadioButtonGroup
        requestOrPost={requestOrPost}
        oneWayOrRoundTrip={oneWayOrRoundTrip}
        onChange={onChange}
      />
      <DynamicTripDetailsInputs postInfo={postInfo} onChange={onChange} currentDate={currentDate} />

      <div className={styled.hasFlight}>
        <p>Do you have flight information?</p>
        <Form.Check
          value="yes"
          checked={hasFlight === "yes"}
          type="radio"
          name="hasFlight"
          id="yes"
          label="Yes"
          onChange={onChange}
        />
        <Form.Check
          value="no"
          checked={hasFlight === "no"}
          required
          type="radio"
          id="no"
          label="No"
          name="hasFlight"
          onChange={onChange}
        />
      </div>

      {hasFlight === "yes" && (
        <Row className={styled.hasFlightInputs}>
          <Col md>
            <DynamicFormGroup
              label="Airline Name"
              id="airlineName"
              type="text"
              name="airlineName"
              placeholder="Airline Name"
              onChange={onChange}
              value={airlineName}
              asType={Col}
            />
          </Col>
          <Col md>
            <DynamicFormGroup
              label="Flight Number"
              id="flightNumber"
              type="text"
              name="flightNumber"
              placeholder="Flight Number"
              onChange={onChange}
              value={flightNumber}
              asType={Col}
            />
          </Col>
        </Row>
      )}

      <div className={styled.textArea}>
        <DynamicFormGroup
          label="Any messages for fellow travelers? This could include flight details, airline
            information, or special requests."
          id="travelInfo"
          name="travelInfo"
          onChange={onChange}
          required
          errorMessage={travelInfo || "Please provide travel information"}
          value={travelInfo}
          asType={Col}
          as="textarea"
          numberOfRows={3}
          isLabelHidden
        />
      </div>
      <Button disabled={isLoadingToCreateRequestOrPost} className={styled.button} type="submit">
        {isLoadingToCreateRequestOrPost ? "Loading..." : buttonText}
      </Button>
    </Form>
  );
};

export default RequestForm;
