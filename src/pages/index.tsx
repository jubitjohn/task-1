import React from 'react';
import { NextPage,GetServerSideProps,} from 'next';
import Image from 'next/image';
import styles from './homePage.module.css';
import axios from 'axios';
import indiaFlag from 'task-1/public/flag-3d-250.png';

interface HomeProps {
  ipAddress: string;
  visitCount: number;
  country:string;
};

const CountryFlag = ({ country }: { country: string }) => {
  if (country === 'india') {
    return <Image src="task-1/public/flag-3d-250.png" alt="India Flag" className={styles.flag} />;
  }
  return null;
};



const Home: NextPage<HomeProps> = ({ ipAddress, visitCount,country }) => {
  return (
    // <div>
    //   <h1>Welcome to my Next.js web app!</h1>
    //   <p>Your IP address: {ipAddress}</p>
    //   <p>Count Testcase: {visitCount}</p>
    // </div>
    <div className={styles.container}>
      <div className={styles.leftCard}>
        <div className={styles.innerCard}>
        <h2>Your IP</h2>
        <div className={styles.visitCount}>
        <p > {ipAddress}</p>
        <CountryFlag country={country} />
          </div>
      
        </div>
      </div>
      <div className={styles.rightCard}>
        <div className={styles.innerCard}>
          <h2>Website Visit</h2>
          <div className={styles.visitCount}>
            <p>{visitCount}</p> {/* Replace with actual visit count */}
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



    const visitCountResponse = await fetch(`https://peppy-jalebi-6f5a89.netlify.app/api/visit-count?ipAddress=${ipAddress}`);
    // const visitCountResponse = await fetch('http://localhost:3000/api/visit-count');
    const visitCountData = await visitCountResponse.json();
    const visitCount = visitCountData.visitCount;


    return {
      props: {
        ipAddress: ipAddress || null,
        visitCount: visitCount || null,
      },
    };
  } catch (error) {
    console.error('Failed to fetch IP address:', error);
    return {
      props: {
        ipAddress: null,
        visitCount: null,
      },
    };
  }
};

export default Home;
// pages/ssr.tsx


// import { GetServerSideProps, NextPage } from "next";
// import React from "react";


// export interface HomeProps {
//   ip: string;
//   visitCount: number;
// };

// const SSRPage: NextPage<HomeProps> = ({ ip, visitCount }) => {
//   return (
//     <div>
//       <h1>Welcome to my Next.js web app!</h1>
//       <p>Your IP address: {ip}</p>
//       <p>Count test final: {visitCount}</p>
//     </div>
//   );
// };

// export default SSRPage;

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   let ip = req.headers["x-real-ip"];
//   if (!ip) {
//     const forwardedFor = req.headers["x-forwarded-for"];
//     if (Array.isArray(forwardedFor)) {
//       ip = forwardedFor.at(0);
//     } else {
//       ip = forwardedFor?.split(",").at(0) ?? "Unknown";
//     }
//   }
//   // const visitCountResponse = await fetch('https://peppy-jalebi-6f5a89.netlify.app/api/visit-count');
//   const visitCountResponse = await fetch('http://localhost:3000/api/visit-count');
//   const visitCountData = await visitCountResponse.json();
//   const visitCount = visitCountData.ipAddress;
//   return {
//     props: {
//       ip : ip||null,
//       visitCount: visitCount || null,
     
//     },
//   };
// };
