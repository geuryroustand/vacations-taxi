import React from "react";
import Link from "next/link";
import styled from "./TripAdVisor.module.css";

const TripAdVisor = () => {
  return (
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

      <div id="TA_selfserveprop506" className="TA_selfserveprop">
        <ul id="A2LDzC" className="TA_links 0fJ6ZlNfu5">
          <li id="BWhP4ZbYIID" className="cXfWQqS">
            <Link
              title="TripAdvisor reviews "
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
        src="https://www.jscache.com/wejs?wtype=selfserveprop&amp;uniq=506&amp;locationId=10500716&amp;lang=en_US&amp;rating=true&amp;nreviews=5&amp;writereviewlink=true&amp;popIdx=true&amp;iswide=false&amp;border=true&amp;display_version=2"
        data-loadtrk
        onLoad={() => "this.loadtrk=true"}></script>
    </div>
  );
};

export default TripAdVisor;
