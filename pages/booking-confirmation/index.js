import React from "react";

import BookingConfirmation from "../../src/Components/BookingConfirmation/BookingConfirmation";
import MyHead from "../../src/Components/MyHead/MyHead";
import { getTranslation } from "../../src/redux/fetchApiSlice";
import store from "../../src/redux/store";
import { baseURL, fetchData } from "../../src/Helper/fetchData";

export default function BookingConFirmation({ description, title }) {
  return (
    <>
      <MyHead title={title} noIndex canonicalURL="booking-confirmation" />
      <BookingConfirmation desc={description} />;
    </>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(getTranslation.initiate(locale));
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
