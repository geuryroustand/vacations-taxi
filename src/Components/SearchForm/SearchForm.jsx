import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import styled from "./SearchForm.module.css";

import DatePickerSearchForm from "../DatePickerSearchForm/DatePickerSearchForm";

const SearchForm = () => {
  return (
    <Form className={styled.form}>
      <Form.Group className={styled["form-control"]} controlId="formBasicPickLocation">
        <Image src="/images/Location.svg" width="18px" height="18px" alt="location" />
        <Form.Label className="visually-hidden">Enter pick-up location</Form.Label>
        <Form.Control
          className={styled["form-input"]}
          type="text"
          placeholder="Enter pick-up location"
        />
      </Form.Group>

      <Form.Group className={styled["form-control"]} controlId="formBasicDestination">
        <Image src="/images/Location.svg" width="18px" height="18px" alt="location" />
        <Form.Label className="visually-hidden">Enter destination </Form.Label>
        <Form.Control
          className={styled["form-input"]}
          type="text"
          placeholder="Enter destination "
        />
      </Form.Group>
      <DatePickerSearchForm />
      <Button type="submit" className={styled["search-btn"]}>
        <Image src="/images/search.svg" width="18px" height="18px" alt="location" />
        Search
      </Button>
    </Form>
  );
};

export default SearchForm;
