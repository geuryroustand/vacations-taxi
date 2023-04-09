import dynamic from "next/dynamic";
import { Suspense } from "react";

import FallBackLoading from "../Loading/FallBackLoading";
import styled from "./TripAdVisor.module.css";

// const DynamicCertificateOfExcellence = dynamic(() => import("./CertificateOfExcellence"), {
//   suspense: true
// });

const DynamicReviewSnippets = dynamic(() => import("./ReviewSnippets"), {
  suspense: true
});

const TripAdVisor = () => {
  return (
    <div className={styled.tripAdVisor}>
      <Suspense fallback={<FallBackLoading />}>
        {/* <DynamicCertificateOfExcellence /> */}
        <DynamicReviewSnippets />
      </Suspense>
    </div>
  );
};

export default TripAdVisor;
