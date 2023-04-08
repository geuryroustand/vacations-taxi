import React from "react";
import Image from "next/image";

const ReviewSnippets = () => {
  return (
    <div>
      <strong>Our customers say in TripAdvisor</strong>
      <div style={{ paddingTop: "1.5rem" }} id="TA_selfserveprop506" className="TA_selfserveprop">
        <ul id="A2LDzC" className="TA_links 0fJ6ZlNfu5">
          <li id="BWhP4ZbYIID" className="cXfWQqS">
            <a
              title="Vacations Taxis TripAdvisor reviews"
              target="_blank"
              href="https://www.tripadvisor.com/Attraction_Review-g811253-d10500716-Reviews-Dominican_Airport_Transfers_PLUS-Santa_Barbara_de_Samana_Samana_Province_Dominic.html"
              rel="noreferrer">
              <Image
                width={100}
                height={100}
                alt="Dominican Airport transfer TripAdvisor"
                src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg"
              />
            </a>
          </li>
        </ul>
      </div>
      <script
        defer
        src="https://www.jscache.com/wejs?wtype=selfserveprop&amp;uniq=506&amp;locationId=10500716&amp;lang=en_US&amp;rating=true&amp;nreviews=5&amp;writereviewlink=true&amp;popIdx=true&amp;iswide=false&amp;border=true&amp;display_version=2"
        data-loadtrk
        onLoad={() => "this.loadtrk=true"}
      />
    </div>
  );
};

export default ReviewSnippets;
