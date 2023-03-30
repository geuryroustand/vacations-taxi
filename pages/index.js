// import Script from "next/script";
import dynamic from "next/dynamic";
import Head from "next/head";
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
      <Head>
        {/* Facebook Meta Tag */}

        <meta property="og:url" content="https://www.vacationstaxis.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Book A Taxi Online | Airport Transportation" />
        <meta
          property="og:description"
          content="Book a taxi online for easy airport transfers to/from your accommodation. Various taxi transportation services. Tried & trusted. Flight tracking. 24/7 support."
        />
        <meta property="og:image" content="https://www.vacationstaxis.com/images/openGraph.jpg" />

        {/* Twitter Meta Tag */}

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="vacationstaxis.com" />
        <meta property="twitter:url" content="https://www.vacationstaxis.com/" />
        <meta property="twitter:title" content="Book A Taxi Online | Airport Transportation" />
        <meta
          property="twitter:description"
          content="Book a taxi online for easy airport transfers to/from your accommodation. Various taxi transportation services. Tried & trusted. Flight tracking. 24/7 support."
        />
        <meta
          property="twitter:image"
          content="https://www.vacationstaxis.com/images/openGraph.jpg"
        />
      </Head>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9JT5V14EVY"
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'https://www.googletagmanager.com/gtag/js?id=G-9JT5V14EVY');
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
