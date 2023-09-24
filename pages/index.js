/* eslint-disable no-console */
import Script from "next/script";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";

import FallBackLoading from "../src/Components/Loading/FallBackLoading";
import { useGetUserQuery } from "../src/redux/fetchApiSlice";

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
  const router = useRouter();

  const { data } = useGetUserQuery();

  console.log(data);

  const queryParameters = new URLSearchParams(router.query);

  useEffect(() => {
    if (queryParameters.size === 0) return;
    const fetchUser = async () => {
      const userResponse = await fetch(
        `http://localhost:1337/api/auth/google/callback?id_token=${queryParameters.toString()}`
      );
      const user = await userResponse.json();

      console.log(user);
    };
    fetchUser();
  }, [queryParameters.size === 0]);
  // console.log("url", `http://localhost:1337/api/auth/google/callback${request.nextUrl.search}`);
  // const user = await userResponse.json();

  // console.log("user", user);

  // fetchUser();

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
        src={`https://www.googletagmanager.com/gtag/js?id=${
          process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
        }`}
        strategy="worker"
        // strategy="lazyOnload"
      />

      {/* <Script id="google-analytics" strategy="worker">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'https://www.googletagmanager.com/gtag/js?id=${
          process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
        }');
      `}
      </Script> */}

      <Script
        id="google-analytics"
        strategy="worker"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'https://www.googletagmanager.com/gtag/js?id=${
          process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
        }');
      `
        }}
      />

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
