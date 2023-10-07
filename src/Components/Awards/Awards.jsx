import dynamic from "next/dynamic";

import Container from "react-bootstrap/Container";
import { useTranslation } from "next-i18next";
import styled from "./Awards.module.css";
import FallBackLoading from "../Loading/FallBackLoading";

const DynamicTripAdVisor = dynamic(() => import("./TripAdVisor"), {
  loading: () => <FallBackLoading />
});

const Awards = () => {
  const { t } = useTranslation("home");
  return (
    <section className={styled.awards}>
      <Container>
        <h2>{t("awards")}</h2>
        <DynamicTripAdVisor />
      </Container>
    </section>
  );
};

export default Awards;
