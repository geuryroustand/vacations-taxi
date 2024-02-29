import dynamic from "next/dynamic";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import { fetchCommonContent } from "../../src/redux/ContentEndpoints";
import store from "../../src/redux/store";

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

function findRide() {
  return (
    <>
      <DynamicFindRideSearch />
      <TrustedShareRide />
      <SharedCarsList />
    </>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(fetchCommonContent.initiate(locale));
};

export const getServerSideProps = store.getServerSideProps(
  (storeValue) =>
    async ({ locale, params, res }) => {
      try {
        const { dispatch } = storeValue;
        if (locale) {
          await fetchTranslationData(dispatch, locale);
        }

        // const { slug } = params;

        // const { data } = await fetchData(
        //   `${baseURL}/blogs?filters[slug][$eq]=${slug}&locale=${locale}&populate[seo][populate]=*`
        // );

        // if (!data || data.length === 0) {
        //   res.statusCode = 404;
        //   return {
        //     notFound: true
        //   };
        // }
        // const { description, slug: slugURL, seo } = data[0].attributes;
        // const { metaTitle, metaDescription, keywords, structuredData, metaSocial } = seo;

        // return {
        //   props: {
        //     description,
        //     slugURL,
        //     metaTitle,
        //     metaDescription,
        //     keywords,
        //     structuredData,
        //     metaSocial
        //   }
        // };
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
