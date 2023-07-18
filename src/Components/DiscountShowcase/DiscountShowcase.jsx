import React from "react";

import styled from "./DiscountShowcase.module.css";

function DiscountShowcase() {
  return (
    <div className={styled.discountShowCaseBg}>
      🎉 Special Travel Offer: Get 10% Off!🎉 <span>using code #goGoToTravel.</span>
    </div>
  );
}

export default DiscountShowcase;
