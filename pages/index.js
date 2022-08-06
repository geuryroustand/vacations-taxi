import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <p style={{ background: "red" }}>
      HomePage
      <Image src="/images/Location.svg" width="50px" height="50px" />
    </p>
  );
}
