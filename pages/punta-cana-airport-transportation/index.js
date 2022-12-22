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

const DynamicAwards = dynamic(() => import("../../src/Components/Awards/Awards"), {
  suspense: true
});

export default function seoPage() {
  return (
    <Suspense fallback={<FallBackLoading />}>
      <MyHead
        title="Punta cana airport transportation"
        desc="Reliable and affordable Punta Cana airport transportation"
        keyword="Punta cana airport transportation | Airport shuttle punta cana | Punta Cana Airport Transfer | Punta Cana Taxi "
      />
      <DynamicHeader
        heading1="Punta cana airport transportation"
        heading2="It is factual that Punta Cana airport is the busiest airport in the Dominican Republic. It is accountable for above
          60% air arrivals. It has open-air terminals. Our Punta Cana airport transfer shuttle
          services are going to add to your travel leisure in many ways."
      />
      <DynamicTrusted />

      <Container className={styled.articleContainer}>
        <article>
          <h2 className={styled.articleHeading}>Airport shuttle punta cana</h2>
          <p>
            There can be perhaps innumerable rationales to go for the Punta Cana airport transfer
            shuttle services. Here we are going to give you some of the reasons why you must choose
            us.
          </p>
          <h2 className={styled.articleHeading}>Reliable punta cana private transfers:</h2>
          <p>
            You may trust us. You and your luggage will reach the destination without uncertainty.
            You will feel safe in addition to the comfort during travel time in the Punta Cana
            airport transfer shuttle services.
          </p>
          <b>Time-bound:</b>
          <p>
            Punctuality is our slogan. You will get the shuttle in time. They will probably come to
            the airport waiting vicinity with the tag of your name if you have done advanced
            booking. Things will remain even and easy for you to have a warm welcome from us.
          </p>
          <b>Licensed drivers:</b>
          <p>
            All drivers of Punta Cana airport transfer shuttle services are fully licensed for sure.
            They are skilled persons and can drive you efficiently and comfortably to your
            destination resort. Drivers are trustworthy. You will feel safe and sound as they will
            take superior concern for you plus your baggage in every manner.
          </p>
          <b>Competitive rates:</b>
          <p>
            One may compare the rates of Punta Cana airport transfer shuttle service with other
            local service providers. We justify the fact that we are giving comfort at a low fee.
            One may avail of return packages and during-go packages, if interested. Offers are
            there, you may avail more and more so you may find more and more discounts.
          </p>
          <b>Online booking:</b>
          <p>
            If somebody either lack time to do bookings on calls or by sending a person to book
            Punta Cana airport transfer shuttle service, so we are also giving you the choice of
            online booking service too. This will keep time and you will be stress-free when your
            reserved Punta Cana airport transfer shuttle service will be standing by to pick you
            from the airport after air travel tiredness.
          </p>
          <b>Meet and Greet:</b>
          <p>
            Punta Cana airport transfer shuttle service is staffs are pretty well-mannered and
            soft-spoken. You would appreciate having the drive with a nice being who may keep on
            responding to you about your queries in a sophisticated style.
          </p>
          <b>Flight Monitoring:</b>
          <p>
            Punta Cana airport transfer shuttle services are pretty dynamic in-flight monitoring. We
            keep ourselves up to date about flight timings and schedules. This is a big aid for the
            passengers as they may keep themselves stress-free while availing Punta Cana airport
            transfer shuttle services.
          </p>
          <b>Vehicles:</b>
          <p>
            There is a variety of a vehicle, you may ask for the type of Punta Cana airport transfer
            shuttle service as per the needs of your co-travelers. Vehicles are cozy and easygoing.
            here is no matter, even if you are traveling as a single, as a couple, with a family,
            with a cluster of people, or with a fleet. We are going to assist you in every bit of
            the way.
          </p>
        </article>

        <article>
          <h2 className={styled.articleHeading}>Transportation from punta cana airport</h2>
          <p>We have like:</p>
          <ul>
            <li> SUV Premium (6 passengers)</li>
            <li> Van (6 passengers)</li>
            <li> Mini Bus (15 passengers)</li>
            <li> Auto Bus (22 passengers) </li>
            <li>Auto Bus (33 passengers) </li>
            <li>Auto Bus (50 passengers) </li>
          </ul>

          <p>
            <strong>Additional services:</strong> We are also providing additional services if
            required by the customer. They are:
          </p>

          <ul>
            <li> Drinks (water, soft drinks, champagne, beer)</li>
            <li> Child seating (for diverse ages)</li>
            <li>
              VIP Arrival and Departure Assistance, including a Custom assistant at the airport,
              Meet Greet service, VIP lounge at the landing field and Fast pass all the way through
              customs and passport control
            </li>
          </ul>
        </article>

        <article>
          <h2 className={styled.articleHeading}>Why Punta Cana is famous?</h2>
          <p>
            Punta Cana is at the easternmost altitude of the Dominican Republic, away from the
            Caribbean Sea and the Atlantic Ocean. Its a place acknowledged for its 32km elongated
            beaches and lucid waters.
          </p>
          <p>
            The Bávaro area and Punta Cana unite to form what is called La Costa del Coco, or most
            commonly the Coconut Coast. It is a place of lavish, all-inclusive resorts and hotels.
            Its well-liked for zip-lining, windsurfing, kayaking, and sailing boats. Its climate is
            warm and tropical round the year.
          </p>
        </article>

        <article>
          <h2 className={styled.articleHeading}>Best Resorts of Punta Cana:</h2>
          <p>
            Hospitality is there lying in the air. One may love to enjoy the smell of calm and
            friendliness when arriving at the resort. Travelers trust resorts to facilitate the
            pinnacle of all sorts of relaxation. Resort guests are welcome to taste the communal
            onsite amenities like pools, restaurants, luxuries, excursions, and shopping, and hang
            about the night in luxurious privacy rooms, villas, or flats.
          </p>

          <p>One may avail Punta Cana airport transfer shuttle to the booked locus at ease. </p>
          <ul>
            <li>Punta Cana airport to Dreams Punta Cana</li>
            <li>Punta Cana airport to Majestic mirage Punta Cana</li>
            <li>Punta Cana airport to Majestic Elegance Punta Cana</li>
            <li>Punta Cana airport to Now onyx Punta Cana</li>
            <li>Punta Cana airport to Paradisus Punta Cana</li>
            <li>Punta Cana airport to Secrets Cap Cana </li>
            <li>Punta Cana airport to Century Punta Cana</li>
          </ul>
        </article>
      </Container>
      <DynamicAwards />
    </Suspense>
  );
}
