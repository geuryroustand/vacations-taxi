import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import Container from "react-bootstrap/Container";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import styled from "../locationsName.module.css";
import MyHead from "../../src/Components/MyHead/MyHead";

const DynamicHeader = dynamic(() => import("../../src/Components/Header/Header"), {
  suspense: true
});

const DynamicTrusted = dynamic(() => import("../../src/Components/Trusted/Trusted"), {
  suspense: true
});

// const DynamicAwards = dynamic(() => import("../../src/Components/Awards/Awards"), {
//   suspense: true
// });

export default function seoPage() {
  return (
    <Suspense fallback={<FallBackLoading />}>
      <MyHead
        title="Transportation from Punta Cana Airport"
        desc="Are you looking for a reliable and comfortable transportation option from Punta Cana Airport to your hotel? Look no further than VacationsTaxis.com."
        keyword="Transportation from Punta Cana Airport,Punta Cana Shuttle Service ,Transfer Santo Domingo Punta Cana , VIP Transfer Punta Cana"
      />
      <DynamicHeader
        heading1="Transportation from Punta Cana Airport"
        heading2="We specialize in providing airport transfer services to travelers visiting the beautiful Punta Cana region in the Dominican Republic."
      />
      <DynamicTrusted
        altAirPlane="Transportation from Punta Cana Airport"
        altCreditCart="Punta Cana Shuttle Service "
        altPayment="Transfer Santo Domingo Punta Cana"
      />

      <Container className={styled.articleContainer}>
        <article>
          <p>
            Our experienced drivers will greet you at the airport and transport you safely to your
            hotel in one of our well-maintained vehicles. We understand that arriving at a new place
            can be stressful, which is why we aim to make your transportation experience as smooth
            and hassle-free as possible. Our team is committed to providing you with prompt and
            courteous service, so you can start your vacation on the right foot.
          </p>
          <p>
            In addition to our airport transfer service, we also offer a wide range of
            transportation options for your entire vacation. From sightseeing tours to
            transportation to popular destinations, we have you covered. We also offer VIP and
            luxury transportation options, such as our Amstar and Diamond transportation services,
            for those who want to travel in style.
          </p>
          <h2 className={styled.articleHeading}>Punta Cana Shuttle Service</h2>
          <p>
            Are you looking for a convenient and cost-effective way to get from Punta Cana Airport
            to your hotel? Look no further than VacationsTaxis.com &apos;s Punta Cana shuttle
            service. Our shuttle service is a great option for travelers who want to save money on
            transportation while still enjoying a comfortable and safe ride.
          </p>
          <p>
            Our shuttle service is available 24/7 and it runs on a regular schedule, with multiple
            pick-up and drop-off points at different hotels in Punta Cana. This way you can enjoy a
            shared ride with other travelers at a very affordable price. Our experienced drivers are
            knowledgeable of the local area and they will make sure that you reach your destination
            on time and in comfort.
          </p>

          <p>
            In addition to our shuttle service, we also offer private car and VIP transportation
            options. If you want a more personalized transportation experience, you can choose our
            Amstar or Diamond transportation services which provide luxury vehicles and experienced
            drivers.
          </p>
        </article>
        <article>
          <h2 className={styled.articleHeading}>Transfer Santo Domingo Punta Cana</h2>
          <p>
            Are you planning a trip to Punta Cana and looking for a safe and reliable way to get
            there from Santo Domingo? Look no further than VacationsTaxis.com &apos;s transfer
            service between Santo Domingo and Punta Cana.
          </p>

          <p>
            Our experienced drivers will pick you up at your location in Santo Domingo and safely
            transport you to Punta Cana. We understand that traveling can be stressful, which is why
            we aim to make your transportation experience as smooth and hassle-free as possible. Our
            team is committed to providing you with prompt and courteous service, so you can start
            your vacation on the right foot.
          </p>

          <p>
            We also offer transportation options for your entire vacation in Punta Cana. From
            sightseeing tours to transportation to popular destinations, we have you covered. We
            also offer VIP and luxury transportation options, such as our Amstar and Diamond
            transportation services, for those who want to travel in style.
          </p>
        </article>

        <article>
          <h2 className={styled.articleHeading}>VIP Transfer Punta Cana</h2>
          <p>
            Are you looking to travel in style and comfort during your vacation in Punta Cana? Look
            no further than VacationsTaxis.com&apos;s VIP transfer service.
          </p>

          <p>
            Our VIP transfer service provides luxury vehicles and experienced drivers to ensure that
            you have a safe and comfortable transportation experience. Whether you &apos;re
            traveling to or from the airport, or need transportation for a special event or
            sightseeing tour, our VIP service is the perfect choice for those who want to travel in
            luxury.
          </p>
        </article>
      </Container>
      {/* <DynamicAwards /> */}
    </Suspense>
  );
}
