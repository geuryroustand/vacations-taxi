import dynamic from "next/dynamic";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import { fetchCommonContent } from "../../src/redux/ContentEndpoints";
import store from "../../src/redux/store";
import fetchData from "../../src/Helper/fetchData";
import { baseURL } from "../../environment";
import SeoHead from "../../src/Components/SeoHead/SeoHead";

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

function findRide({ mainHeading, subheading, why, because, seo, carpool, inText }) {
  const { metaTitle, metaDescription, keywords, canonicalURL } = seo || {};
  return (
    <>
      <SeoHead
        title={metaTitle}
        desc={metaDescription}
        canonicalURL={canonicalURL}
        keyword={keywords}
      />
      <DynamicFindRideSearch mainHeading={mainHeading} subheading={subheading} />
      <TrustedShareRide why={why} because={because} />
      <SharedCarsList carpool={carpool} inText={inText} />
    </>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(fetchCommonContent.initiate(locale));
};

export const getServerSideProps = store.getServerSideProps(
  (storeValue) =>
    async ({ locale, res }) => {
      try {
        const { dispatch } = storeValue;
        if (locale) {
          await fetchTranslationData(dispatch, locale);
        }

        // const { slug } = params;

        const { data } = await fetchData(
          `${baseURL}/find-car-shared-ride?populate=*&locale=${locale}`
        );

        const { mainHeading, subheading, why, because, seo, carpool, inText } =
          data.attributes || {};

        // if (!data || data.length === 0) {
        //   res.statusCode = 404;
        //   return {
        //     notFound: true
        //   };
        // }
        // const { description, slug: slugURL, seo } = data[0].attributes;
        // const { metaTitle, metaDescription, keywords, structuredData, metaSocial } = seo;

        return {
          props: {
            mainHeading,
            subheading,
            why,
            because,
            seo,
            carpool,
            inText
          }
        };
      } catch (error) {
        if (error.response && error.response.status === 500) {
          res.writeHead(500, { Location: "/500" });
          res.end();
          return { props: {} };
        }
        res.writeHead(404, { Location: "/404" });
        res.end();
        return { props: {} };
      }
    }
);

export default findRide;
