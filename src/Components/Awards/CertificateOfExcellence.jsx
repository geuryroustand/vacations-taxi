import dynamic from "next/dynamic";
import Script from "next/script";

const Image = dynamic(() => import("next/image"), { ssr: false });
const CertificateOfExcellence = () => {
  return (
    <div style={{ marginBottom: "auto" }}>
      <strong>Awards</strong>
      <div
        style={{ paddingTop: "1.5rem" }}
        id="TA_certificateOfExcellence205"
        className="TA_certificateOfExcellence">
        <ul id="QOV4fvI" className="TA_links 4jTqnY">
          <li id="cWN8uWeN" className="RbFc52sklG">
            <a
              title="TripAdvisor Certificate of Excellence for Vacations Taxis"
              rel="noreferrer"
              target="_blank"
              href="https://www.tripadvisor.com/Attraction_Review-g811253-d10500716-Reviews-VacationsTaxis-Santa_Barbara_de_Samana_Samana_Province_Dominican_Republic.html">
              <Image
                width={140}
                height={114}
                src="https://www.tripadvisor.com/img/cdsi/img2/awards/v2/coe-14348-2.png"
                alt=" Punta Cana Aiport transfer TripAdvisor"
                className="widCOEImg"
                id="CDSWIDCOELOGO"
              />
            </a>
          </li>
        </ul>
      </div>
      <Script
        src="https://www.jscache.com/wejs?wtype=certificateOfExcellence&amp;uniq=205&amp;locationId=10500716&amp;lang=en_US&amp;year=2018&amp;display_version=2"
        data-loadtrk
        onLoad={() => "this.loadtrk=true"}
      />
    </div>
  );
};

export default CertificateOfExcellence;
