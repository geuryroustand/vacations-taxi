import Image from "next/image";
import Link from "next/link";

import { FaUsers } from "react-icons/fa";

import styled from "./CardTripDetails.module.css";
import TripDetails from "../TripDetails/TripDetails";

const CardTripDetails = () => {
  return (
    <li className={styled.cardTripDetailsMain}>
      <Link className={styled.link} href="/12344232">
        <section className={styled.cardTripDetails}>
          <h2 className={styled.heading}>Punta Cana Airport to Bahia Principe Punta Cana</h2>
          <div className={styled.cardTripDetailsInfo}>
            <div className={styled.cardTripDetailsProfile}>
              <div className={styled.profileImgAndName}>
                <Image src="/images/hero.JPG" width="35" height="35" alt="Flight tracking" />
                <p className={styled.name}>John Does</p>
              </div>

              <p className={styled.passenger}>
                Passenger <FaUsers /> 3
              </p>
            </div>
            <TripDetails
              airlineName="Air Canada"
              date="Sat, 30 April 2022"
              flightNumber="AD530"
              time="21:00 pm"
            />
          </div>
        </section>
      </Link>
    </li>
  );
};

export default CardTripDetails;
