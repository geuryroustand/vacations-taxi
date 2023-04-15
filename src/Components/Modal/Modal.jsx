import React, { Suspense } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import dynamic from "next/dynamic";

import FallBackLoading from "../Loading/FallBackLoading";

const DynamicSearchFormInput = dynamic(() => import("../SearchFormInput/SearchFormInput"), {
  loading: () => <FallBackLoading />
});

const DynamicSearchOptions = dynamic(() => import("../SearchOptions/SearchOptions"), {
  loading: () => <FallBackLoading />
});

const ModalBoots = ({
  showModal,
  closeModal,
  modalInputValues,
  locationsFetch,
  onChange,
  onClickedSearchedResult,
  inputReference
}) => {
  const { title, label, placeHolder, optionToShow } = modalInputValues;

  return (
    <Suspense fallback={<FallBackLoading />}>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <DynamicSearchFormInput
              inputReference={inputReference}
              label={label}
              placeHolder={placeHolder}
              autoFocus
              onChange={onChange}
            />
          </Form>
          <DynamicSearchOptions
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
    </Suspense>
  );
};

export default ModalBoots;
