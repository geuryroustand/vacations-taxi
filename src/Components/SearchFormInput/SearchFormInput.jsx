import React from "react";
import Form from "react-bootstrap/Form";
import styled from "./SearchFormInput.module.css";
import Image from "next/image";
import SearchOptions from "../SearchOptions/SearchOptions";

const SearchFormInput = ({
  label,
  placeHolder,
  name,
  id,
  isEmptyFeedback,
  required,
  disabled,
  validated,
  autoFocus,
  onClickInput,
  onChange
}) => {
  const isEmpty = validated ? styled.validated : "";

  return (
    <>
      <Form.Group className={`${styled["form-control"]} ${isEmpty}`} controlId={id}>
        <Image src="/images/location.svg" width="18px" height="18px" alt="location" />
        <div className={styled.formControl}>
          <Form.Label className="visually-hidden"> {label} </Form.Label>
          <Form.Control
            className={styled["form-input"]}
            type="text"
            placeholder={placeHolder}
            required={required}
            disabled={disabled}
            autoFocus={autoFocus}
            onClick={onClickInput}
            onChange={onChange}
            name={name}
          />
          <Form.Control.Feedback className={styled.searchFormFeedBack} type="invalid">
            {isEmptyFeedback}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      {/* <Form.Group
        className={`${styled["form-control"]} ${isEmpty}`}
        controlId="formBasicDestination2">
        <Image src="/images/location.svg" width="18px" height="18px" alt="location" />

        <div className={styled.formControl}>
          <Form.Label className="visually-hidden">{labelDrop} </Form.Label>
          <Form.Control
            className={styled["form-input"]}
            type="text"
            placeholder={placeHolderDrop}
            required={required}
            disabled={disabled}
          />
          <Form.Control.Feedback className={styled.searchFormFeedBack} type="invalid">
            Please provide a drop-off location
          </Form.Control.Feedback>
        </div>
      </Form.Group> */}
    </>
  );
};

export default SearchFormInput;
