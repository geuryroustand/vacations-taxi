import Head from "next/head";
import Awards from "../src/Components/Awards/Awards";
import Header from "../src/Components/Header/Header";
import HowWork from "../src/Components/HowWork/HowWork";
import Trusted from "../src/Components/Trusted/Trusted";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Header />
      <Trusted />
      <HowWork />
      <Awards />
    </>
  );
}
