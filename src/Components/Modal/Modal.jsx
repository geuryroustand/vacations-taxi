import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SearchFormInput from "../SearchFormInput/SearchFormInput";
import SearchOptions from "../SearchOptions/SearchOptions";

const ModalBoots = ({
  showModal,
  closeModal,
  modalInputValues,
  locationsFetch,
  onChange,
  onClickedSearchedResult
}) => {
  const { title, label, placeHolder, optionToShow } = modalInputValues;

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <SearchFormInput label={label} placeHolder={placeHolder} autoFocus onChange={onChange} />
        </Form>
        <SearchOptions
          show
          locationsFetch={locationsFetch}
          onClickedSearchedResult={onClickedSearchedResult}
          optionToShow={optionToShow}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBoots;
