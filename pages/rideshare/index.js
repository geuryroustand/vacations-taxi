import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

import Container from "react-bootstrap/Container";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";

import styled from "./rideshare.module.css";
import SeoHead from "../../src/Components/SeoHead/SeoHead";
import { fetchCommonContent } from "../../src/redux/ContentEndpoints";
import store from "../../src/redux/store";
import { useFetchRequestAndPostQuery } from "../../src/redux/SharedRideEndpoints";

const DynamicSearchForm = dynamic(() => import("../../src/Components/SearchForm/SearchForm"), {
  loading: () => <FallBackLoading />
});

const DynamicCardTripDetails = dynamic(
  () => import("../../src/Components/CardTripDetails/CardTripDetails"),
  {
    loading: () => <FallBackLoading />
  }
);

export default function rideShare() {
  const { locale, query } = useRouter();

  const { data, isLoading, isError } = useFetchRequestAndPostQuery(
    `http://localhost:1337/api/share-rides?filters[pickUp][$contains]=Aeroupuerto&populate=*`
  );

  // const { data: posts = [] } = data?.data;

  const { pickUp, dropOff } = query;

  const queryKey = `fetchCommonContent("${locale}")`;

  const { bookingSearch } = useSelector(
    (state) => state?.contentApiSlice?.queries[queryKey]?.data?.data?.attributes || {}
  );

  return (
    <div className={styled.main}>
      <SeoHead title={`${pickUp} to ${dropOff}`} noIndex />
      <Container className={styled.container}>
        <DynamicSearchForm
          bookingSearch={bookingSearch}
          isCarSharingPage
          // isRoundTrip={isRoundTrip}
          showReturnSearchForm
        />
        <h1 className={styled.bigHeading}>{`From ${pickUp} to ${dropOff}`}</h1>
        <ul className={styled.list}>
          {data?.data.map(({ id, attributes }) => (
            <DynamicCardTripDetails key={id} id={id} attributes={attributes} />
          ))}
        </ul>
      </Container>
    </div>
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
