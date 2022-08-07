import React from "react";
import Form from "react-bootstrap/Form";
import styled from "./SearchFormInput.module.css";
import Image from "next/image";

const SearchFormInput = ({ labelPick, placeHolderPick, labelDrop, placeHolderDrop }) => {
  return (
    <>
      <Form.Group className={styled["form-control"]} controlId="formBasicPickLocation">
        <Image src="/images/location.svg" width="18px" height="18px" alt="location" />
        <Form.Label className="visually-hidden"> {labelPick} </Form.Label>
        <Form.Control className={styled["form-input"]} type="text" placeholder={placeHolderPick} />
      </Form.Group>

      <Form.Group className={styled["form-control"]} controlId="formBasicDestination">
        <Image src="/images/location.svg" width="18px" height="18px" alt="location" />
        <Form.Label className="visually-hidden">{labelDrop} </Form.Label>
        <Form.Control className={styled["form-input"]} type="text" placeholder={placeHolderDrop} />
      </Form.Group>
    </>
  );
};

export default SearchFormInput;
