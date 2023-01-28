// import Script from "next/script";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import FallBackLoading from "../src/Components/Loading/FallBackLoading";

// import { persistor } from "../src/redux/store";

const DynamicHeader = dynamic(() => import("../src/Components/Header/Header"), {
  suspense: true
});

const DynamicTrusted = dynamic(() => import("../src/Components/Trusted/Trusted"), {
  suspense: true
});

const DynamicHowWork = dynamic(() => import("../src/Components/HowWork/HowWork"), {
  suspense: true
});
const DynamicFaq = dynamic(() => import("../src/Components/Faq/Faq"), {
  suspense: true
});
// const DynamicAwards = dynamic(() => import("../src/Components/Awards/Awards"), {
//   suspense: true
// });

export default function Home() {
  // persistor.purge();
  return (
    // <>
    //   <Script
    //     strategy="worker"
    //     id="truendoAutoBlock"
    //     type="text/javascript"
    //     src="https://cdn.priv.center/pc/truendo_cmp.pid.js"
    //     data-siteid="9c95c2f3-c18c-49ce-b8dd-1e5c04cb32b2"
    //   />

    <Suspense fallback={<FallBackLoading />}>
      <DynamicHeader
        heading1="Reliable, low cost airport transfers"
        heading2="Easy airport transfers to and from your accommodation"
      />

      <DynamicTrusted />

      <DynamicHowWork />

      <DynamicFaq />

      {/* <DynamicAwards /> */}
    </Suspense>
    // </>
  );
}
