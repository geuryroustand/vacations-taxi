import Form from "react-bootstrap/Form";
import styled from "./RadioButtonGroup.module.css";

const RadioButtonGroup = ({
  requestOrPost,
  oneWayOrRoundTrip,
  onChange,
  radioBtnRequest,
  radioBtnOffer,
  oneWay
}) => {
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
          label={radioBtnRequest}
          onChange={onChange}
        />
        <Form.Check
          required
          type="radio"
          checked={requestOrPost === "post"}
          value="post"
          id="post"
          label={radioBtnOffer}
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
          label={oneWay}
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
