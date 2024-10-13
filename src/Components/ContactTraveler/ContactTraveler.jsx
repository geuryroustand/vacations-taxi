/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import styled from "./ContactTraveler.module.css";
import {
  useAddCommentToPostMutation,
  useFetchUserCommentsQuery
} from "../../redux/SharedRideEndpoints";
import { getCookieToken, setCookieUrlPath } from "../../Helper/auth";

import AuthLinks from "../AuthLinks/AuthLinks";

const DynamicFormGroup = dynamic(() => import("../FormGroup/FormGroup"));

const ContactTraveler = ({
  id,
  user,
  sendToMessage,
  placeHolderText,
  leaveCommentText,
  loginText,
  or,
  createText,
  buttonText,
  loadingStateText,
  errorMessageText,
  serverErrorMessageText
}) => {
  const { query } = useRouter();

  const PROD = process.env.NODE_ENV === "production";

  const { refetch } = useFetchUserCommentsQuery(
    `${
      PROD
        ? process.env.NEXT_PUBLIC_API_PROD_URL_STRAPI
        : process.env.NEXT_PUBLIC_API_STRAPI_DEV_URL
    }/comments/api::share-ride.share-ride:${query?.detailsId}`
  );

  const token = getCookieToken();

  const [{ validated, errorMessage }, setValidated] = useState({
    errorMessage: "",
    validated: false
  });

  const queryKey = `fetchUser("${token}")`;

  const { data: UserData } = useSelector((state) => state.userApiSlice.queries[queryKey]) || {};

  // const { content } = errors;

  const [addComment, setAddComment] = useState({
    content: ""
  });

  const [createComment, { isLoading, error, isError }] = useAddCommentToPostMutation(
    `${
      PROD
        ? process.env.NEXT_PUBLIC_API_PROD_URL_STRAPI
        : process.env.NEXT_PUBLIC_API_STRAPI_DEV_URL
    }/comments/api::share-ride.share-ride:${query?.detailsId}`
  );

  const onChange = (event) => {
    setAddComment({
      ...addComment,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (!form.checkValidity() === false) {
      const url = `${
        PROD
          ? process.env.NEXT_PUBLIC_API_PROD_URL_STRAPI
          : process.env.NEXT_PUBLIC_API_STRAPI_DEV_URL
      }/comments/api::share-ride.share-ride:${id}`;

      if (token)
        createComment({ url, comment: addComment, token })
          .unwrap()
          .then(() => refetch())
          .catch(() => {
            throw setValidated((previousState) => ({
              ...previousState,
              errorMessage: serverErrorMessageText,
              validated: true
            }));
          });

      setAddComment({
        content: ""
      });

      return;
    }

    setValidated({
      errorMessage: "",
      validated: true
    });
  };

  useEffect(() => {
    if (isError) {
      const { message } = error.data.error;

      // const errorMessageInfo = JSON.parse(message)?.message;

      setValidated((previousState) => ({
        ...previousState,
        errorMessage: message,
        validated: true
      }));
    }
  }, [isError]);

  if (!UserData) {
    setCookieUrlPath(`rideshare/${query?.detailsId}`);
  }

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit} className={styled.form}>
      <DynamicFormGroup
        label={`${sendToMessage} ${user?.username}`}
        id="content"
        name="content"
        onChange={onChange}
        required
        errorMessage={errorMessage || errorMessageText}
        isInvalid={!!errorMessage}
        value={addComment.content}
        as="textarea"
        placeholder={placeHolderText}
        numberOfRows={3}
        isLabelHidden
      />
      {UserData ? (
        <Button disabled={isLoading} className={styled.btnBg} type="submit" variant="primary">
          {isLoading ? loadingStateText : buttonText}
        </Button>
      ) : (
        <AuthLinks loginText={loginText} or={or} createText={createText} title={leaveCommentText} />
      )}
    </Form>
  );
};

export default ContactTraveler;
