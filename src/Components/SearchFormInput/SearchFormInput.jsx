import React from "react";
import Form from "react-bootstrap/Form";
import Image from "next/image";

import styled from "./SearchFormInput.module.css";

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
  onChange,
  onKeyUp,
  searchedTerm,
  inputReference
}) => {
  const isEmpty = validated ? styled.validated : "";

  // const debouncedOnChange = useCallback(debounce(onChange, 1000), []);

  return (
    <Form.Group className={`${styled["form-control"]} ${isEmpty}`} controlId={id}>
      <Image src="/images/location.svg" width="18" height="18" alt="location" />
      <div className={styled.formControl}>
        <Form.Label className="visually-hidden"> {label} </Form.Label>
        <Form.Control
          className={styled["form-input"]}
          type="search"
          placeholder={placeHolder}
          required={required}
          disabled={disabled}
          autoFocus={autoFocus}
          onClick={onClickInput}
          onChange={onChange}
          name={name}
          onKeyUp={onKeyUp}
          value={searchedTerm}
          autoComplete="off"
          ref={inputReference}
        />
        <Form.Control.Feedback className={styled.searchFormFeedBack} type="invalid">
          {isEmptyFeedback}
        </Form.Control.Feedback>
      </div>
    </Form.Group>
  );
};

export default SearchFormInput;
