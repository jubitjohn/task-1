import React from "react";
import { NextPage, GetServerSideProps } from "next";
import Image from "next/image";
import styles from "./homePage.module.css";
import axios from "axios";
import { useIncrementVisitCount } from "./visitCountUtils";

interface HomeProps {
  ipAddress: string;
  visitCount: number;
  country: string;
}

const CountryFlag = ({ country }: { country: string }) => {
  if (country === "India") {
    return (
      <Image
        src="https://purecatamphetamine.github.io/country-flag-icons/3x2/IN.svg"
        alt="India Flag"
        className={styles.flag}
      />
    );
  }
  return null;
};

const Home: NextPage<HomeProps> = ({ ipAddress, visitCount, country }) => {

  visitCount=useIncrementVisitCount(ipAddress || "");
  return (
    
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.leftCard}>
          <div className={styles.innerCard}>
            <h2>Your IP :: </h2>
            <div className={styles.visitCount}>
              <p> {ipAddress}&nbsp;&nbsp;</p> 
              <CountryFlag country={country} />
            </div>
          </div>
        </div>
        <div className={styles.rightCard}>
          <div className={styles.innerCard}>
            <h2>Website Visits : </h2>
            <div className={styles.visitCount}>
              <p>{visitCount}</p> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    let ipAddress = req.headers["x-real-ip"];
    if (!ipAddress) {
      const forwardedFor = req.headers["x-forwarded-for"];
      if (Array.isArray(forwardedFor)) {
        ipAddress = forwardedFor.at(0);
      } else {
        ipAddress = forwardedFor?.split(",").at(0) ?? "Unknown";
      }
    }
    const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);
    const country = response.data.country;

    // const visitCountResponse = await fetch(
    //   `https://peppy-jalebi-6f5a89.netlify.app/api/visit-count?ipAddress=${ipAddress}`
    // );
    // const visitCountResponse = IncrementVisitCount(ipAddress||'');
    // const visitCount = visitCountResponse;

    return {
      props: {
        ipAddress: ipAddress || null,
        // visitCount: visitCount || null,
        country: country || null,
      },
    };
  } catch (error) {
    console.error("Failed to fetch IP address:", error);
    return {
      props: {
        ipAddress: null,
        visitCount: null,
      },
    };
  }
};

export default Home;
