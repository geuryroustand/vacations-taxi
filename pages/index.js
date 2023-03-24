// import Script from "next/script";
import dynamic from "next/dynamic";
import Script from "next/script";
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
const DynamicAwards = dynamic(() => import("../src/Components/Awards/Awards"), {
  suspense: true
});

export default function Home() {
  // persistor.purge();
  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${
          process.env.NODE_ENV === "production" ?? process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
        }`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${
          process.env.NODE_ENV === "production" ?? process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
        }');
      `}
      </Script>
      <Suspense fallback={<FallBackLoading />}>
        <DynamicHeader
          heading1="Reliable, low cost airport transfers"
          heading2="Easy airport transfers to and from your accommodation"
        />

        <DynamicTrusted
          altAirPlane="Dominican Airport Transfers Services"
          altCreditCart="PUJ Punta cana Airport Transfer"
          altPayment="SDQ Santo Domingo Airport Transfers"
        />

        <DynamicHowWork />

        <DynamicAwards />
        <DynamicFaq />
      </Suspense>
    </>
  );
}
