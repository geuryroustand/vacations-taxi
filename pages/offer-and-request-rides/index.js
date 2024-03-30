import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";

import SeoHead from "../../src/Components/SeoHead/SeoHead";
import { fetchCommonContent } from "../../src/redux/ContentEndpoints";
import store from "../../src/redux/store";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import {
  getCookieToken,
  removeCookieTokenWithOutReload,
  setCookieUrlPath
} from "../../src/Helper/auth";
import { useFetchUserQuery } from "../../src/redux/AuthenticationEndpoints";

import styled from "./postsAndRequests.module.css";
import { useCreateRequestOrPostMutation } from "../../src/redux/SharedRideEndpoints";

import submitRequestOrPost, { initialPostInfoState } from "../../src/Helper/submitRequestOrPost";
import AuthLinks from "../../src/Components/AuthLinks/AuthLinks";

import fetchData from "../../src/Helper/fetchData";
import { baseURL } from "../../environment";

const DynamicRequestForm = dynamic(() => import("../../src/Components/RequestForm/RequestForm"), {
  loading: () => <FallBackLoading />
});

function Requests({ data: contentData }) {
  const { pathname, push } = useRouter();
  const token = getCookieToken();
  const { data, isLoading, isError } = useFetchUserQuery(token);

  const { requestHeading, postHeading, loading, title, loginOrCreate, login, or, create } =
    contentData?.attributes || {};

  const [
    createRequestOrPost,
    {
      data: requestOrPostData,
      isError: isErrorRequestOrPostData,
      isLoading: isLoadingToCreateRequestOrPost
    }
  ] = useCreateRequestOrPostMutation();

  if (isError) {
    removeCookieTokenWithOutReload();
  }

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currentDate = `${day}-${month}-${year}`;

  // Todo
  // after the user make a post , need to create links with the locations of the posts in the results page

  const [postInfo, setPostInfo] = useState(initialPostInfoState);

  const { requestOrPost } = postInfo;

  const headingText = requestOrPost === "request" ? requestHeading : postHeading;

  const [{ validated }, setValidated] = useState({
    validated: false
  });

  const onChange = (event) => {
    setPostInfo({
      ...postInfo,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (!form.checkValidity() === false) {
      submitRequestOrPost(postInfo, setPostInfo, createRequestOrPost, token);
    }
    setValidated({
      errors: {},
      validated: true
    });
  };

  useEffect(() => {
    if (!data) setCookieUrlPath(pathname);
    if (data) setPostInfo({ ...postInfo, user: data.id });
  }, [data]);

  if (requestOrPostData && !isLoading && !isErrorRequestOrPostData) {
    const { data: requestOrPostResponse } = requestOrPostData;
    const { id } = requestOrPostResponse;

    push(`/rideshare/${id}`);
  }

  if (isLoading) {
    return (
      <>
        <SeoHead title={loading} noIndex canonicalURL="post-or-request-a-trip" />
        <FallBackLoading />
      </>
    );
  }

  return (
    <div className={styled.main}>
      <Container className={styled.containerForm}>
        <SeoHead title={title} noIndex canonicalURL="offer-and-request-rides" />
        {data ? (
          <>
            <h1 className={styled.mainHeading}>{headingText}</h1>
            <DynamicRequestForm
              contentData={contentData}
              postInfo={postInfo}
              onChange={onChange}
              onSubmit={onSubmit}
              validated={validated}
              currentDate={currentDate}
              isLoadingToCreateRequestOrPost={isLoadingToCreateRequestOrPost}
            />
          </>
        ) : (
          <AuthLinks title={loginOrCreate} loginText={login} or={or} createText={create} />
        )}
      </Container>
    </div>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(fetchCommonContent.initiate(locale));
};

export const getServerSideProps = store.getServerSideProps(
  (storeValue) =>
    async ({ locale, res }) => {
      try {
        const { dispatch } = storeValue;
        if (locale) {
          await fetchTranslationData(dispatch, locale);
        }
        const { data } = await fetchData(`${baseURL}/offer-or-request-trip?locale=${locale}`);

        // const {
        //   requestHeading,
        //   postHeading,
        //   radioBtnRequest,
        //   radioBtnOffer,
        //   oneWay,
        //   roundTrip,
        //   tripHeading,
        //   pickUpLocation,
        //   pickUpLocationErrorMessage,
        //   arrivalDate,
        //   arrivalDateErrorMessage,
        //   arrivalTimeOffer,
        //   arrivalTimeRequest,
        //   arrivalTimeErrorMessage,
        //   arrivalPrice,
        //   arrivalPriceErrorMessage,
        //   pickUpLocationPlaceHolder,
        //   arrivalDropOffLocation,
        //   arrivalDropOffLocationPlacerHolder,
        //   arrivalDropOffLocationErrorMessage,
        //   arrivalQtyOfTravelerRequest,
        //   arrivalQtyOfTravelerOffer,
        //   arrivalTraveler,
        //   hasFlight,
        //   yes,
        //   no,
        //   arrivalAirlineName,
        //   arrivalFlightNumber,
        //   travelerInfo,
        //   travelerInfoErrorMessage,
        //   btnLoadingState,
        //   btnRequest,
        //   btnOffer,
        //   travelerInfoPlacerHolder,
        //   zone
        // } = data.attributes || {};

        return {
          props: {
            data
            // requestHeading,
            // postHeading,
            // radioBtnRequest,
            // radioBtnOffer,
            // oneWay,
            // roundTrip,
            // tripHeading,
            // pickUpLocation,
            // pickUpLocationErrorMessage,
            // arrivalDate,
            // arrivalDateErrorMessage,
            // arrivalTimeOffer,
            // arrivalTimeRequest,
            // arrivalTimeErrorMessage,
            // arrivalPrice,
            // arrivalPriceErrorMessage,
            // pickUpLocationPlaceHolder,
            // arrivalDropOffLocation,
            // arrivalDropOffLocationPlacerHolder,
            // arrivalDropOffLocationErrorMessage,
            // arrivalQtyOfTravelerRequest,
            // arrivalQtyOfTravelerOffer,
            // arrivalTraveler,
            // hasFlight,
            // yes,
            // no,
            // arrivalAirlineName,
            // arrivalFlightNumber,
            // travelerInfo,
            // travelerInfoErrorMessage,
            // btnLoadingState,
            // btnRequest,
            // btnOffer,
            // travelerInfoPlacerHolder,
            // zone
          }
        };
      } catch (error) {
        if (error.response && error.response.status === 500) {
          res.writeHead(500, { Location: "/500" });
          res.end();
          return { props: {} };
        }
        res.writeHead(404, { Location: "/404" });
        res.end();
        return { props: {} };
      }
    }
);

export default Requests;
