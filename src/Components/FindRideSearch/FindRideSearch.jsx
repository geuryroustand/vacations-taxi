import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import styled from "./FindRideSearch.module.css";
import FallBackLoading from "../Loading/FallBackLoading";

const DynamicSearchForm = dynamic(() => import("../SearchForm/SearchForm"), {
  loading: () => <FallBackLoading />
});

function FindRideSearch({ mainHeading, subheading }) {
  const { locale } = useRouter();

  const queryKey = `fetchCommonContent("${locale}")`;

  const { bookingSearch } = useSelector(
    (state) => state?.contentApiSlice?.queries[queryKey]?.data?.data?.attributes || {}
  );

  return (
    <div className={styled.main}>
      <Container>
        <div className={styled.heading}>
          <h1>{mainHeading}</h1>
          <h2>{subheading}</h2>
        </div>

        <DynamicSearchForm
          bookingSearch={bookingSearch}
          isCarSharingPage
          // isRoundTrip={isRoundTrip}
          showReturnSearchForm
        />
      </Container>
    </div>
  );
}

export default FindRideSearch;
