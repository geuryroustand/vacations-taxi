import dynamic from "next/dynamic";
import { Suspense } from "react";

import styled from "./TripAdVisor.module.css";
import FallBackLoading from "../Loading/FallBackLoading";

const DynamicCertificateOfExcellence = dynamic(() => import("./CertificateOfExcellence"), {
  ssr: true
});

const DynamicReviewSnippets = dynamic(() => import("./ReviewSnippets"), {
  ssr: true
});

const TripAdVisor = () => {
  return (
    <div className={styled.tripAdVisor}>
      <Suspense fallback={<FallBackLoading />}>
        <DynamicCertificateOfExcellence />
        <DynamicReviewSnippets />
      </Suspense>
    </div>
  );
};

export default TripAdVisor;
