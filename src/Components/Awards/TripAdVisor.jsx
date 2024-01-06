import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import styled from "./TripAdVisor.module.css";
import FallBackLoading from "../Loading/FallBackLoading";

const DynamicCertificateOfExcellence = dynamic(() => import("./CertificateOfExcellence"), {
  loading: () => <FallBackLoading />
});

const DynamicReviewSnippets = dynamic(() => import("./ReviewSnippets"), {
  loading: () => <FallBackLoading />
});

const TripAdVisor = () => {
  const { locale } = useRouter();
  const queryKey = `fetchCommonContent("${locale}")`;

  const { award } = useSelector(
    (state) => state?.contentApiSlice?.queries[queryKey]?.data?.data?.attributes || {}
  );
  const { awardHeading = "", tripAdvisorHeading = "" } = award || {};

  return (
    <div className={styled.tripAdVisor}>
      <DynamicCertificateOfExcellence heading={awardHeading} />
      <DynamicReviewSnippets heading={tripAdvisorHeading} />
    </div>
  );
};

export default TripAdVisor;
