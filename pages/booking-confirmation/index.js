import React from "react";

import BookingConfirmation from "../../src/Components/BookingConfirmation/BookingConfirmation";
import MyHead from "../../src/Components/MyHead/MyHead";

export default function BookingConFirmation() {
  return (
    <>
      <MyHead title="Booking Confirmation" noIndex />
      <BookingConfirmation />;
    </>
  );
}
