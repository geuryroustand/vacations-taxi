import Link from "next/link";
import dynamic from "next/dynamic";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";

import styled from "./rideshare.module.css";
import SeoHead from "../../src/Components/SeoHead/SeoHead";
import { fetchCommonContent } from "../../src/redux/ContentEndpoints";
import store from "../../src/redux/store";
import { useFetchRequestAndPostQuery } from "../../src/redux/SharedRideEndpoints";
import { baseURL } from "../../environment";
import fetchData from "../../src/Helper/fetchData";

const DynamicSearchForm = dynamic(() => import("../../src/Components/SearchForm/SearchForm"), {
  loading: () => <FallBackLoading />
});

const DynamicCardTripDetails = dynamic(
  () => import("../../src/Components/CardTripDetails/CardTripDetails"),
  {
    loading: () => <FallBackLoading />
  }
);

export default function rideShare({ from, to, notFoundMessage, linkText }) {
  const { locale, query } = useRouter();
  const { pickUp, dropOff } = query;

  const { data, isLoading, isError } = useFetchRequestAndPostQuery(
    `${baseURL}/share-rides?filters[pickUp][$containsi]=${pickUp}&populate=*`
  );

  const queryKey = `fetchCommonContent("${locale}")`;

  const { bookingSearch } = useSelector(
    (state) => state?.contentApiSlice?.queries[queryKey]?.data?.data?.attributes || {}
  );
  const hasDropOff = dropOff || "";

  if (isLoading && !isError) {
    return <FallBackLoading />;
  }

  return (
    <div className={styled.main}>
      <SeoHead title={`${pickUp} ${hasDropOff && `${to} ${dropOff}`}`} noIndex />
      <Container className={styled.container}>
        <DynamicSearchForm
          bookingSearch={bookingSearch}
          isCarSharingPage
          // isRoundTrip={isRoundTrip}
          showReturnSearchForm
        />
        <h1 className={styled.bigHeading}>{`${from} ${pickUp} ${
          hasDropOff && `${to} ${dropOff}`
        }`}</h1>
        {data?.data.length === 0 && !isLoading && !isError ? (
          <>
            <p>{notFoundMessage}😞</p>
            <Link href="/post-and-request">{linkText}</Link>
          </>
        ) : (
          <ul className={styled.list}>
            {data?.data.map(({ id, attributes }) => (
              <DynamicCardTripDetails to={to} key={id} id={id} attributes={attributes} />
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(fetchCommonContent.initiate(locale));
};

export const getServerSideProps = store.getServerSideProps((storeValue) =>
  // eslint-disable-next-line consistent-return
  async ({ locale, res }) => {
    try {
      const { dispatch } = storeValue;
      if (locale) {
        await fetchTranslationData(dispatch, locale);
      }

      const { data } = await fetchData(`${baseURL}/rideshare-list?locale=${locale}`);

      const { from, to, notFoundMessage, linkText } = data.attributes || {};

      return {
        props: {
          from,
          to,
          notFoundMessage,
          linkText
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
