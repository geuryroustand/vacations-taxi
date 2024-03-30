import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import { FaUsers } from "react-icons/fa";

import styled from "./CardTripDetails.module.css";
import FallBackLoading from "../Loading/FallBackLoading";

import useDateTimeFormatter from "../../Hook/useDateTimeFormatter";

const DynamicTripDetails = dynamic(() => import("../TripDetails/TripDetails"), {
  loading: () => <FallBackLoading />
});

const CardTripDetails = ({ attributes, id, to }) => {
  const { time, date, pickUp, dropOff, qtyOfTravelers, user, airlineName, flightNumber } =
    attributes;

  const { username, avatar } = (user && user.data && user.data.attributes) || {};

  const { formatTime, formatDate } = useDateTimeFormatter();

  const { formats } = avatar || {};

  const { thumbnail } = formats || {};

  return (
    <li className={styled.cardTripDetailsMain}>
      <Link target="_blank" className={styled.link} href={`rideshare/${id}`}>
        <section className={styled.cardTripDetails}>
          <h2 className={styled.heading}>{`${pickUp} ${to} ${dropOff}`}</h2>
          <div className={styled.cardTripDetailsInfo}>
            <div className={styled.cardTripDetailsProfile}>
              <div className={styled.profileImgAndName}>
                {avatar ? (
                  <Image src={thumbnail?.url} width="38" height="38" alt={username} />
                ) : (
                  <Image
                    src={`https://ui-avatars.com/api/?name=${username}`}
                    width="38"
                    height="38"
                    alt={username}
                  />
                )}
                <p className={styled.name}>{username}</p>
              </div>

              <p className={styled.passenger}>
                Passenger <FaUsers /> {qtyOfTravelers}
              </p>
            </div>
            <DynamicTripDetails
              airlineName={airlineName}
              date={formatDate(date)}
              flightNumber={flightNumber}
              time={formatTime(time)}
            />
          </div>
        </section>
      </Link>
    </li>
  );
};

export default CardTripDetails;
