import dynamic from "next/dynamic";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";

const DynamicFindRideSearch = dynamic(
  () => import("../../src/Components/FindRideSearch/FindRideSearch"),
  {
    loading: () => <FallBackLoading />
  }
);

const TrustedShareRide = dynamic(() => import("../../src/Components/Trusted/TrustedShareRide"), {
  loading: () => <FallBackLoading />
});

const SharedCarsList = dynamic(() => import("../../src/Components/SharedCarsList/SharedCarsList"), {
  loading: () => <FallBackLoading />
});

// TODO: car-sharing URL and carSharing link
// When the user click on car sharing link will be transfer to
// a search form and will short it a list of posts

function findRide() {
  return (
    <>
      <DynamicFindRideSearch />
      <TrustedShareRide />
      <SharedCarsList />
    </>
  );
}

export default findRide;
