import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import RideShareDetails from "../../src/Components/RideShareDetails/RideShareDetails";
import UserComments from "../../src/Components/UserComments/UserComments";
import styled from "./rideshare.module.css";

import SeoHead from "../../src/Components/SeoHead/SeoHead";
import { fetchCommonContent } from "../../src/redux/ContentEndpoints";
import store from "../../src/redux/store";
import fetchData from "../../src/Helper/fetchData";
import { baseURL } from "../../environment";

export default function ridesDetails({
  data,
  trip,
  detail,
  to,
  tripInformation,
  passengerText,
  airlineNameText,
  flightNumberText,
  dateText,
  timeText,
  commentHeading,
  sendToMessage,
  placeHolderText,
  leaveCommentText,
  loginText,
  or,
  createText,
  buttonText,
  loadingStateText,
  errorMessageText,
  serverErrorMessageText
}) {
  console.log(data);
  const { attributes, id } = data || {};

  const { pickUp, dropOff } = attributes || {};

  const user =
    (attributes && attributes.user && attributes.user.data && attributes.user.data.attributes) ||
    {};

  return (
    <div className={styled.main}>
      <SeoHead title={`${pickUp} ${to} ${dropOff}`} noIndex />
      <Container>
        <div className={styled.textContainer}>
          <h1>
            {trip} <span className={styled.details}>{detail}</span>
          </h1>
          <p>
            {pickUp} {to} {dropOff}
          </p>
        </div>
        <Row>
          <Col sm={12} md={6}>
            <RideShareDetails
              passengerText={passengerText}
              tripInformation={tripInformation}
              airlineNameText={airlineNameText}
              flightNumberText={flightNumberText}
              dateText={dateText}
              timeText={timeText}
              attributes={attributes}
            />
          </Col>
          <Col sm={12} md={6}>
            <UserComments
              commentHeading={commentHeading}
              sendToMessage={sendToMessage}
              placeHolderText={placeHolderText}
              leaveCommentText={leaveCommentText}
              loginText={loginText}
              or={or}
              createText={createText}
              id={id}
              user={user}
              buttonText={buttonText}
              loadingStateText={loadingStateText}
              errorMessageText={errorMessageText}
              serverErrorMessageText={serverErrorMessageText}
            />
          </Col>
        </Row>
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
        const { detailsId } = params;

        const { data } = await fetchData(`${baseURL}/share-rides/${detailsId}?populate=*`);

        const { data: localeContent } = await fetchData(`${baseURL}/rideshare?locale=${locale}`);

        const {
          trip,
          detail,
          to,
          tripInformation,
          passengerText,
          airlineNameText,
          flightNumberText,
          dateText,
          timeText,
          commentHeading,
          sendToMessage,
          placeHolderText,
          leaveCommentText,
          loginText,
          or,
          createText,
          buttonText,
          loadingStateText,
          errorMessageText,
          serverErrorMessageText
        } = localeContent.attributes || {};

        return {
          props: {
            data,
            trip,
            detail,
            to,
            tripInformation,
            passengerText,
            airlineNameText,
            flightNumberText,
            dateText,
            timeText,
            commentHeading,
            sendToMessage,
            placeHolderText,
            leaveCommentText,
            loginText,
            or,
            createText,
            buttonText,
            loadingStateText,
            errorMessageText,
            serverErrorMessageText
          }
        };
      } catch (error) {
        if (error.response && error.response.status === 500) {
          res.writeHead(500, { Location: "/500" });
          res.end();
          return { props: {} };
        }

        // res.writeHead(302, { Location: "/404" });
        // res.end();
        return { props: {} };
      }
    }
);

// import { useState } from "react";
// import { useRouter } from "next/router";

// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";

// import SeoHead from "../../src/Components/SeoHead/SeoHead";

// import RideShareDetails from "../../src/Components/RideShareDetails/RideShareDetails";
// import UserComments from "../../src/Components/UserComments/UserComments";

// import { useFetchDataFromAnySourceQuery } from "../../src/redux/fetchUtils";
// import { useFetchCommonContentQuery } from "../../src/redux/ContentEndpoints";

// import styled from "./rideshare.module.css";
// import FallBackLoading from "../../src/Components/Loading/FallBackLoading";

// export default function ridesDetails() {
//   const [error, setError] = useState("");

//   const { query, locale } = useRouter();
//   const { detailsId } = query;

//   const { isLoading: commonContentLoading, isError: commonContentError } =
//     useFetchCommonContentQuery(locale);

//   const {
//     data: shareRidesData,
//     isLoading: shareRidesLoading,
//     isError: shareRidesError
//   } = useFetchDataFromAnySourceQuery(`/share-rides/${detailsId}?populate=*`);

//   const {
//     data: localeContentData,
//     isLoading: localeContentLoading,
//     isError: localeContentError
//   } = useFetchDataFromAnySourceQuery(`/rideshare?locale=${locale}`);

//   const overallLoading = commonContentLoading || shareRidesLoading || localeContentLoading;

//   const {
//     trip,
//     detail,
//     to,
//     tripInformation,
//     passengerText,
//     airlineNameText,
//     flightNumberText,
//     dateText,
//     timeText,
//     commentHeading,
//     sendToMessage,
//     placeHolderText,
//     leaveCommentText,
//     loginText,
//     or,
//     createText,
//     buttonText,
//     loadingStateText,
//     errorMessageText,
//     serverErrorMessageText
//   } = localeContentData?.data.attributes || {};

//   const { attributes, id } = shareRidesData?.data || {};

//   const { pickUp, dropOff } = attributes || {};
//   const user =
//     (attributes && attributes.user && attributes.user.data && attributes.user.data.attributes) ||
//     {};

//   if (overallLoading) {
//     return <FallBackLoading />;
//   }

//   if (commonContentError || shareRidesError || localeContentError) {
//     setError("Error loading data");
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className={styled.main}>
//       <SeoHead title={`${pickUp} ${to} ${dropOff}`} noIndex />
//       <Container>
//         <div className={styled.textContainer}>
//           <h1>
//             {trip} <span className={styled.details}>{detail}</span>
//           </h1>
//           <p>
//             {pickUp} {to} {dropOff}
//           </p>
//         </div>
//         <Row>
//           <Col>
//             <RideShareDetails
//               passengerText={passengerText}
//               tripInformation={tripInformation}
//               airlineNameText={airlineNameText}
//               flightNumberText={flightNumberText}
//               dateText={dateText}
//               timeText={timeText}
//               attributes={attributes}
//             />
//           </Col>
//           <Col>
//             <UserComments
//               commentHeading={commentHeading}
//               sendToMessage={sendToMessage}
//               placeHolderText={placeHolderText}
//               leaveCommentText={leaveCommentText}
//               loginText={loginText}
//               or={or}
//               createText={createText}
//               id={id}
//               user={user}
//               buttonText={buttonText}
//               loadingStateText={loadingStateText}
//               errorMessageText={errorMessageText}
//               serverErrorMessageText={serverErrorMessageText}
//             />
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }
