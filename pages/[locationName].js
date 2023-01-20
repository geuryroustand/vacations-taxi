import dynamic from "next/dynamic";
import { Suspense } from "react";

import Container from "react-bootstrap/Container";

import FallBackLoading from "../src/Components/Loading/FallBackLoading";
import styled from "./locationsName.module.css";

import MyHead from "../src/Components/MyHead/MyHead";

const DynamicHeader = dynamic(() => import("../src/Components/Header/Header"), {
  suspense: true
});

const DynamicTrusted = dynamic(() => import("../src/Components/Trusted/Trusted"), {
  suspense: true
});

const DynamicAwards = dynamic(() => import("../src/Components/Awards/Awards"), {
  suspense: true
});

function PagesForSEO({ locationFound }) {
  const { article1, article2, desc, heading1, keywords } = locationFound;

  return (
    <Suspense fallback={<FallBackLoading />}>
      <MyHead title={heading1} desc={desc} keyword={keywords} />
      <DynamicHeader heading1={heading1} heading2={desc} />
      <DynamicTrusted />
      <Container className={styled.articleContainer}>
        <article>
          <h2 className={styled.articleHeading}>{article1.title}</h2>
          <p>{article1.paragraph}.</p>
        </article>
        <article>
          <h2 className={styled.articleHeading}>{article2.title}</h2>
          <p>{article2.paragraph}.</p>
        </article>
      </Container>
      <DynamicAwards />
    </Suspense>
  );
}

export async function getStaticProps({ params }) {
  const PROD = process.env.NODE_ENV === "production";
  const response = await fetch(
    `${
      PROD
        ? `${process.env.NEXT_PUBLIC_API_PROD_URL}/seoLocations`
        : `${process.env.NEXT_PUBLIC_API_DEV_URL}/seoLocations`
    }`
  );
  const seoLocations = await response.json();

  const locationFound = seoLocations.find(
    (location) => location.heading1.replaceAll(" ", "-").toLowerCase() === params.locationName
  );

  // if (!locationFound) {
  //   return {
  //     notFound: true
  //   };
  // }

  return {
    props: { locationFound },
    revalidate: 10
  };
}

// Pre generated paths

export async function getStaticPaths() {
  const PROD = process.env.NODE_ENV === "production";

  const response = await fetch(
    `${
      PROD
        ? `${process.env.NEXT_PUBLIC_API_PROD_URL}/seoLocations`
        : `${process.env.NEXT_PUBLIC_API_DEV_URL}/seoLocations`
    }`
  );

  const seoLocations = await response.json();

  const locations = seoLocations.map((location) =>
    location.heading1.replaceAll(" ", "-").toLowerCase()
  );

  const pathsWithParameters = locations.map((location) => ({ params: { locationName: location } }));

  return {
    paths: pathsWithParameters,
    // fallback to false will pre generate all the pages in the build
    // fallback to true will generate the pages when the user visit it
    // but when it I need check while the page its getting generate

    // fallback 'blocking' not need a to check that the page is generate
    fallback: false
    // fallback: "blocking"
    // when fallback is true its good idea to set not foundPage in the getStaticPaths in case
    // the path is not found

    // fallback: true
  };
}

export default PagesForSEO;
