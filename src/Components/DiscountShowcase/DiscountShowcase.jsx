import React from "react";
import { useRouter } from "next/router";

import styled from "./DiscountShowcase.module.css";

function DiscountShowcase() {
  const router = useRouter();

  const showOffer =
    router.pathname === "/payment-details" || router.pathname === "/booking-confirmation";

  return (
    !showOffer && (
      <div className={styled.discountShowCaseBg}>
        🎉 Special Travel Offer: Get 10% Off!🎉
        <span> Deal of Day!</span>
      </div>
    )
  );
}

export default DiscountShowcase;
