import dynamic from "next/dynamic";

import styled from "./TripAdVisor.module.css";

const DynamicCertificateOfExcellence = dynamic(() => import("./CertificateOfExcellence"));

const DynamicReviewSnippets = dynamic(() => import("./ReviewSnippets"));

const TripAdVisor = () => {
  return (
    <div className={styled.tripAdVisor}>
      <DynamicCertificateOfExcellence />
      <DynamicReviewSnippets />
    </div>
  );
};

export default TripAdVisor;
