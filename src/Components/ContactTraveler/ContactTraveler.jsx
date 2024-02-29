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

const ContactTraveler = ({ id, user }) => {
  const { query } = useRouter();

  const { refetch } = useFetchUserCommentsQuery(
    `http://localhost:1337/api/comments/api::share-ride.share-ride:${query?.detailsId}`
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
    `http://localhost:1337/api/comments/api::share-ride.share-ride:${query?.detailsId}`
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
      const url = `http://localhost:1337/api/comments/api::share-ride.share-ride:${id}`;

      if (token)
        createComment({ url, comment: addComment, token })
          .unwrap()
          .then(() => refetch())
          .catch(() => {
            throw setValidated((previousState) => ({
              ...previousState,
              errorMessage: "An error occurred while adding the comment. Please try again later.",
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
        label={`Send a message to ${user?.username}`}
        id="content"
        name="content"
        onChange={onChange}
        required
        errorMessage={errorMessage || "Please provide your comment"}
        isInvalid={!!errorMessage}
        value={addComment.content}
        as="textarea"
        placeholder="Eg: I want to share the ride with you..."
        numberOfRows={3}
        isLabelHidden
      />
      {UserData ? (
        <Button disabled={isLoading} className={styled.btnBg} type="submit" variant="primary">
          {isLoading ? "Sending..." : "Send"}
        </Button>
      ) : (
        <AuthLinks title="To leave a comment, please sign in or create an account:" />
      )}
    </Form>
  );
};

export default ContactTraveler;
