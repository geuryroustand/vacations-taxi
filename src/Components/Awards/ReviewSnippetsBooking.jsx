import React from "react";
import dynamic from "next/dynamic";

const Image = dynamic(() => import("next/image"));

const ReviewSnippetsBooking = () => {
  return (
    <>
      <div id="TA_selfserveprop524" className="TA_selfserveprop">
        <ul id="FiHpCV88" className="TA_links gnq1c1MCu">
          <li id="k8aQB8Zt" className="Trdvv6qgXV">
            <a
              title="Vacations Taxis TripAdvisor reviews"
              target="_blank"
              rel="noreferrer"
              href="https://www.tripadvisor.com/Attraction_Review-g811253-d10500716-Reviews-VacationsTaxis-Santa_Barbara_de_Samana_Samana_Province_Dominican_Republic.html">
              <Image
                width={100}
                height={100}
                src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg"
                alt="TripAdvisor"
              />
            </a>
          </li>
        </ul>
      </div>
      <script
        async
        src="https://www.jscache.com/wejs?wtype=selfserveprop&amp;uniq=524&amp;locationId=10500716&amp;lang=en_US&amp;rating=false&amp;nreviews=5&amp;writereviewlink=false&amp;popIdx=true&amp;iswide=false&amp;border=true&amp;display_version=2"
        data-loadtrk
        onLoad={() => "this.loadtrk=true"}
      />
    </>
  );
};

export default ReviewSnippetsBooking;
