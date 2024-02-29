import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import RideShareDetails from "../../src/Components/RideShareDetails/RideShareDetails";
import UserComments from "../../src/Components/UserComments/UserComments";
import styled from "./rideshare.module.css";

import SeoHead from "../../src/Components/SeoHead/SeoHead";
import { fetchCommonContent } from "../../src/redux/ContentEndpoints";
import store from "../../src/redux/store";
import { fetchData } from "../../src/Helper/fetchData";

export default function ridesDetails({ data }) {
  const { attributes, id } = data || {};

  const { pickUp, dropOff } = attributes || {};

  const user = attributes?.user.data.attributes || {};

  return (
    <div className={styled.main}>
      <SeoHead title={`${pickUp} to ${dropOff}`} noIndex />
      <Container>
        <div className={styled.textContainer}>
          <h1>
            Trip <span className={styled.details}>Details</span>
          </h1>
          <p>
            {pickUp} to {dropOff}
          </p>
        </div>
        <Row>
          <Col>
            <RideShareDetails attributes={attributes} />
          </Col>
          <Col>
            <UserComments id={id} user={user} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(fetchCommonContent.initiate(locale));
};

export const getServerSideProps = store.getServerSideProps((storeValue) =>
  // eslint-disable-next-line consistent-return
  async ({ locale, params, res }) => {
    try {
      const { dispatch } = storeValue;
      if (locale) {
        await fetchTranslationData(dispatch, locale);
      }
      const { detailsId } = params;

      const { data } = await fetchData(
        `http://0.0.0.0:1337/api/share-rides/${detailsId}?populate=*`
      );

      return {
        props: {
          data
        }
      };
    } catch (error) {
      if (error.response && error.response.status === 500) {
        res.writeHead(500, { Location: "/500" });
        res.end();
        return { props: {} };
      }

      res.writeHead(302, { Location: "/404" });
      res.end();
    }
  }
);
