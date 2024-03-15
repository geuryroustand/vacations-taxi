import React from "react";

import BookingConfirmation from "../../src/Components/BookingConfirmation/BookingConfirmation";

import store from "../../src/redux/store";

import SeoHead from "../../src/Components/SeoHead/SeoHead";
import { fetchCommonContent } from "../../src/redux/ContentEndpoints";
import fetchData from "../../src/Helper/fetchData";
import { baseURL } from "../../environment";

export default function BookingConFirmation({ description, title }) {
  return (
    <>
      <SeoHead title={title} noIndex canonicalURL="booking-confirmation" />
      <BookingConfirmation desc={description} />
    </>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(fetchCommonContent.initiate(locale));
};

export const getStaticProps = store.getStaticProps((storeValue) => async ({ locale }) => {
  const { dispatch } = storeValue;
  if (locale) {
    await fetchTranslationData(dispatch, locale);
  }

  const { data } = await fetchData(`${baseURL}/booking-confirmation?locale=${locale}`);

  const { description, title } = data.attributes;

  return {
    props: {
      description,
      title
    }
  };
});
