import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
// import Trusted from "../../src/Components/Trusted/Trusted";
import TrustedShareRide from "../../src/Components/Trusted/TrustedShareRide";
import SharedCarsList from "../../src/Components/SharedCarsList/SharedCarsList";

const DynamicFindRideSearch = dynamic(() =>
  import("../../src/Components/FindRideSearch/FindRideSearch")
);

// TODO: car-sharing URL and carSharing link
// When the user click on car sharing link will be transfer to
// a search form and will short it a list of posts

function findRide() {
  return (
    <Suspense fallback={<FallBackLoading />}>
      <DynamicFindRideSearch />
      <TrustedShareRide />
      <SharedCarsList />
    </Suspense>
  );
}

export default findRide;
