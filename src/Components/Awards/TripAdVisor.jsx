import dynamic from "next/dynamic";

import styled from "./TripAdVisor.module.css";
import FallBackLoading from "../Loading/FallBackLoading";

const DynamicCertificateOfExcellence = dynamic(() => import("./CertificateOfExcellence"), {
  loading: () => <FallBackLoading />
});

const DynamicReviewSnippets = dynamic(() => import("./ReviewSnippets"), {
  loading: () => <FallBackLoading />
});

const TripAdVisor = () => {
  return (
    <div className={styled.tripAdVisor}>
      <DynamicCertificateOfExcellence />
      <DynamicReviewSnippets />
    </div>
  );
};

export default TripAdVisor;
