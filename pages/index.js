import Head from "next/head";

import Header from "../src/Components/Header/Header";
import Awards from "../src/Components/Awards/Awards";

import HowWork from "../src/Components/HowWork/HowWork";
import Trusted from "../src/Components/Trusted/Trusted";

import dynamic from "next/dynamic";
import { Suspense } from "react";

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
  return (
    <>
      <Suspense fallback={`Loading...`}>
        <DynamicHeader />
        <DynamicTrusted />
        <DynamicHowWork />

        <DynamicAwards />
      </Suspense>

      {/* <Header /> */}
      {/* <Trusted /> */}
      {/* <HowWork /> */}
      {/* <Awards /> */}
    </>
  );
}
