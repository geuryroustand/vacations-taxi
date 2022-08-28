import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "./TripAdVisor.module.css";

const TripAdVisor = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    setIsLoaded(false);
  }, []);
  return isLoaded ? (
    <h1>Loading </h1>
  ) : (
    <div className={styled.tripAdVisor}>
      <div id="TA_certificateOfExcellence191" className="TA_certificateOfExcellence">
        <ul id="5zjDV6ZetG" className="TA_links aNn96rrV">
          <li id="l27ui5u" className="ww9Pfb8">
            <Link
              title="tripadvisor certificate"
              target="_blank"
              href="https://www.tripadvisor.com/Attraction_Review-g811253-d10500716-Reviews-Dominican_Airport_Transfers_PLUS-Santa_Barbara_de_Samana_Samana_Province_Dominic.html">
              <img
                src="https://www.tripadvisor.com/img/cdsi/img2/awards/v2/coe-14348-2.png"
                alt="TripAdvisor"
                className="widCOEImg"
                id="CDSWIDCOELOGO"
              />
            </Link>
          </li>
        </ul>
      </div>
      <script
        async
        src="https://www.jscache.com/wejs?wtype=certificateOfExcellence&amp;uniq=191&amp;locationId=10500716&amp;lang=en_US&amp;year=2018&amp;display_version=2"
        data-loadtrk
        onLoad={() => "this.loadtrk=true"}></script>

      <div id="TA_selfserveprop292" className="TA_selfserveprop">
        <ul id="Zy9r3Q" className="TA_links 6dzyQN">
          <li id="ISXsnc36" className="XRdjhCvmMUTI">
            <Link
              target="_blank"
              href="https://www.tripadvisor.com/Attraction_Review-g811253-d10500716-Reviews-Dominican_Airport_Transfers_PLUS-Santa_Barbara_de_Samana_Samana_Province_Dominic.html">
              <img
                src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg"
                alt="TripAdvisor"
              />
            </Link>
          </li>
        </ul>
      </div>
      <script
        async
        src="https://www.jscache.com/wejs?wtype=selfserveprop&amp;uniq=292&amp;locationId=10500716&amp;lang=en_US&amp;rating=true&amp;nreviews=5&amp;writereviewlink=true&amp;popIdx=true&amp;iswide=false&amp;border=true&amp;display_version=2"
        data-loadtrk
        onload="this.loadtrk=true"></script>
    </div>
  );
};

export default TripAdVisor;
