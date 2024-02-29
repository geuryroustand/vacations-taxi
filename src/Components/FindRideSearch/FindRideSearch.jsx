import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import styled from "./FindRideSearch.module.css";
import FallBackLoading from "../Loading/FallBackLoading";
import SeoHead from "../SeoHead/SeoHead";

const DynamicSearchForm = dynamic(() => import("../SearchForm/SearchForm"), {
  loading: () => <FallBackLoading />
});

function FindRideSearch() {
  const { locale } = useRouter();

  const queryKey = `fetchCommonContent("${locale}")`;

  const { bookingSearch } = useSelector(
    (state) => state?.contentApiSlice?.queries[queryKey]?.data?.data?.attributes || {}
  );

  return (
    <div className={styled.main}>
      <Container>
        <SeoHead title="Find a Shared Ride" noIndex canonicalURL="find-a-shared-ride" />
        <div className={styled.heading}>
          <h1>Find a Ride</h1>
          <p>
            Discover convenient and affordable shared airport transfer rides to reach your
            destination effortlessly!
          </p>
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
