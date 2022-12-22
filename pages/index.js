import dynamic from "next/dynamic";
import { Suspense } from "react";
import FallBackLoading from "../src/Components/Loading/FallBackLoading";
import { persistor } from "../src/redux/store";

const DynamicHeader = dynamic(() => import("../src/Components/Header/Header"), {
  suspense: true
});

const DynamicTrusted = dynamic(() => import("../src/Components/Trusted/Trusted"), {
  suspense: true
});

const DynamicHowWork = dynamic(() => import("../src/Components/HowWork/HowWork"), {
  suspense: true
});

const DynamicAwards = dynamic(() => import("../src/Components/Awards/Awards"), {
  suspense: true
});

export default function Home() {
  persistor.purge();
  return (
    <Suspense fallback={<FallBackLoading />}>
      <DynamicHeader
        heading1="Reliable, low cost airport transfers"
        heading2=" Easy airport transfers to and from your accommodation"
      />
      <DynamicTrusted />
      <DynamicHowWork />
      <DynamicAwards />
    </Suspense>
  );
}
