// import Script from "next/script";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Suspense } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
  const { t } = useTranslation();
  // persistor.purge();
  return (
    <>
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

        gtag('config', 'G-9JT5V14EVY');
      `}
      </Script>
      <Suspense fallback={<FallBackLoading />}>
        <DynamicHeader heading1={t("home:heading1")} heading2={t("home:heading2")} />

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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home", "howWork", "faq", "footer"]))
    }
  };
}
