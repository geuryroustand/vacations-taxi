import React from "react";

import BookingConfirmation from "../../src/Components/BookingConfirmation/BookingConfirmation";
import MyHead from "../../src/Components/MyHead/MyHead";
import { getTranslation } from "../../src/redux/fetchApiSlice";
import store from "../../src/redux/store";

export default function BookingConFirmation() {
  return (
    <>
      <MyHead title="Booking Confirmation" noIndex />
      <BookingConfirmation />;
    </>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(getTranslation.initiate(locale));
};

export const getStaticProps = store.getStaticProps((storeValue) => async ({ locale }) => {
  // storeValue.dispatch(getTranslation.initiate("en"));
  const { dispatch } = storeValue;
  if (locale) {
    await fetchTranslationData(dispatch, locale);
  }
});
