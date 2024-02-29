import Form from "react-bootstrap/Form";
import styled from "./RadioButtonGroup.module.css";

const RadioButtonGroup = ({ requestOrPost, oneWayOrRoundTrip, onChange }) => {
  return (
    <>
      <div className={styled.radioButton}>
        <Form.Check
          checked={requestOrPost === "request"}
          required
          type="radio"
          value="request"
          name="requestOrPost"
          id="request"
          label="Publish a request for a ride"
          onChange={onChange}
        />
        <Form.Check
          required
          type="radio"
          checked={requestOrPost === "post"}
          value="post"
          id="post"
          label="Publish a ride"
          name="requestOrPost"
          onChange={onChange}
        />
      </div>
      <div className={styled.radioButton}>
        <Form.Check
          type="radio"
          value="oneWay"
          checked={oneWayOrRoundTrip === "oneWay"}
          id="oneWay"
          label="OneWay"
          name="oneWayOrRoundTrip"
          onChange={onChange}
        />
        {/* <Form.Check
          type="radio"
          value="roundTrip"
          checked={oneWayOrRoundTrip === "roundTrip"}
          name="oneWayOrRoundTrip"
          id="roundTrip"
          label="RoundTrip"
          onChange={onChange}
        /> */}
      </div>
    </>
  );
};

export default RadioButtonGroup;
