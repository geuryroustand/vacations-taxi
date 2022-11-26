import Link from "next/link";
import React from "react";

// eslint-disable-next-line import/prefer-default-export
export const List = () => {
  return (
    <li>
      <h3>Services</h3>
      <Link href="/">How it Works</Link>
      <Link href="/">Shared Ride Information</Link>
      <Link href="/">Destinations</Link>
      <Link href="/">Airports</Link>
    </li>
  );
};
