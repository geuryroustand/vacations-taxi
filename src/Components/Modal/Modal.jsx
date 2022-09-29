import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SearchFormInput from "../SearchFormInput/SearchFormInput";
import SearchOptions from "../SearchOptions/SearchOptions";

const ModalBoots = ({ show, closeModal, inputValue }) => {
  const { title, label, placeHolder } = inputValue;

  return (
    <>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* autoFocus */}
            <SearchFormInput label={label} placeHolder={placeHolder} />
          </Form>
          <SearchOptions />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalBoots;
