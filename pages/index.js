import dynamic from "next/dynamic";
import Head from "next/head";

import FallBackLoading from "../src/Components/Loading/FallBackLoading";

// import { persistor } from "../src/redux/store";

const DynamicHeader = dynamic(() => import("../src/Components/Header/Header"), {
  loading: () => <FallBackLoading />
});

const DynamicTrusted = dynamic(() => import("../src/Components/Trusted/Trusted"), {
  loading: () => <FallBackLoading />
});

const DynamicHowWork = dynamic(() => import("../src/Components/HowWork/HowWork"), {
  loading: () => <FallBackLoading />
});

const DynamicFaq = dynamic(() => import("../src/Components/Faq/Faq"), {
  loading: () => <FallBackLoading />
});

const DynamicAwards = dynamic(() => import("../src/Components/Awards/Awards"), {
  loading: () => <FallBackLoading />
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

      <DynamicHeader
        heading1="Reliable, Low Cost Airport Transfers"
        heading1Paragraph="Easy airport transfers to and from your accommodation"
      />

      <DynamicTrusted
        altAirPlane="Dominican Airport Transfers Services"
        altCreditCart="PUJ Punta cana Airport Transfer"
        altPayment="SDQ Santo Domingo Airport Transfers"
      />

      <DynamicHowWork />
      <DynamicAwards />
      <DynamicFaq />
    </>
  );
}
