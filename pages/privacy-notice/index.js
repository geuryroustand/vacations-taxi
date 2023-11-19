import React from "react";

import Container from "react-bootstrap/Container";
import MyHead from "../../src/Components/MyHead/MyHead";
import { getTranslation } from "../../src/redux/fetchApiSlice";
import store from "../../src/redux/store";

export default function termsAndConditions() {
  return (
    <Container>
      <MyHead title="Privacy Notice" noIndex canonicalURL="privacy-notice" />
      <div className="mt-5">
        <h1>Privacy Notice</h1>

        <p>
          At vacationstaxis.com, we are committed to protecting the privacy of our customers. This
          Privacy Notice explains how we collect, use, and share personal information when you visit
          our website or use our services.
        </p>

        <h2>Information We Collect</h2>

        <p>
          We collect personal information when you book a taxi or other transportation service
          through our website or app, including your name, contact information, payment details, and
          travel preferences. We also collect information about your location and movements during
          your trip, as well as details about your device, such as IP address and browser type.
        </p>
        <p>
          We may also collect information from third-party sources, such as social media platforms,
          to enhance our services and provide personalized recommendations.
        </p>

        <p>
          <b>Web browser cookies</b>Our Site may use &quot;cookies&quot; to enhance User experience.
          User&apos;s web browser places cookies on their hard drive for record-keeping purposes and
          sometimes to track information about them. User may choose to set their web browser to
          refuse cookies, or to alert you when cookies are being sent. If they do so, note that some
          parts of the Site may not function properly.
        </p>
        <h2>How We Use Your Information</h2>
        <p>
          We use your personal information to process your bookings, communicate with you about your
          trip, and provide you with the best possible service. We may also use your information for
          research and analytics purposes, to improve our services and develop new products.
        </p>
        <p>
          We may share your information with third parties, such as transportation providers and
          payment processors, for the purpose of fulfilling your booking and completing your trip.
        </p>
        <h2>Your Choices and Rights</h2>
        <p>
          You have the right to access, rectify, erase, restrict, or object to the processing of
          your personal information. You also have the right to data portability, which allows you
          to request a copy of your personal information in a machine-readable format.
        </p>

        <p>
          You can exercise these rights by contacting us at{" "}
          <b>
            <a href="mailto:privacy@vacationstaxis.com">privacy@vacationstaxis.com.</a>
          </b>
        </p>
        <h2>Data Security</h2>
        <p>
          We take appropriate technical and organizational measures to protect your personal
          information against unauthorized or unlawful processing, and against accidental loss,
          destruction, or damage.
        </p>
        <h2>Electronic newsletters</h2>
        <p>
          If User decides to opt-in to our mailing list, they will receive emails that may include
          company news, updates, related product or service information, etc. If at any time the
          User would like to unsubscribe from receiving future emails, we include detailed
          unsubscribe instructions at the bottom of each email or User may contact us via our Site.
          We may use third party service providers to help us operate our business and the Site or
          administer activities on our behalf, such as sending out newsletters or surveys. We may
          share your information with these third parties for those limited purposes provided that
          you have given us your permission.
        </p>
        <h2>Changes to This Privacy Notice</h2>
        <p>
          We may update this Privacy Notice from time to time to reflect changes in our practices or
          legal requirements. We will post any updates on this page, so please check back regularly
          to stay informed about how we are protecting your personal information.
        </p>
        <p>
          If you have any questions or concerns about our privacy practices, please do not hesitate
          to contact us at{" "}
          <b>
            {" "}
            <a href="mailto:privacy@vacationstaxis.com">privacy@vacationstaxis.com.</a>
          </b>
        </p>
      </div>
    </Container>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(getTranslation.initiate(locale));
};

export const getStaticProps = store.getStaticProps((storeValue) => async ({ locale }) => {
  // storeValue.dispatch(getTranslation.initiate("en"));
  const { dispatch } = storeValue;
  if (locale) {
    await fetchTranslationData(dispatch, locale);
  }
});
