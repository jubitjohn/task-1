// import React from 'react';
// import { NextPage } from 'next';
// import axios from 'axios';

// export interface HomeProps {
//   ipAddress: string;
//   visitCount: number;
// }

// const Home: NextPage<HomeProps> = ({ ipAddress, visitCount }) => {
//   return (
//     <div>
//       <h1>Welcome to my Next.js web app!</h1>
//       <p>Your IP address: {ipAddress}</p>
//       <p>Count: {visitCount}</p>
//     </div>
//   );
// };


// export const getServerSideProps = async () => {
//   try {
//     const response = await axios.get('http://ip-api.com/json/');
//     const ipAddress = response.data.query;



//     const visitCountResponse = await fetch('https://peppy-jalebi-6f5a89.netlify.app/api/visit-count');
//     const visitCountData = await visitCountResponse.json();
//     const visitCount = visitCountData.visitCount;


//     return {
//       props: {
//         ipAddress: ipAddress || null,
//         visitCount: visitCount || null,
//       },
//     };
//   } catch (error) {
//     console.error('Failed to fetch IP address:', error);
//     return {
//       props: {
//         ipAddress: null,
//         visitCount: null,
//       },
//     };
//   }
// };

// export default Home;
// pages/ssr.tsx
import { GetServerSideProps, NextPage } from "next";
import React from "react";


export interface HomeProps {
  ip: string;
  visitCount: number;
};

const SSRPage: NextPage<HomeProps> = ({ ip, visitCount }) => {
  return (
    <div>
      <h1>Welcome to my Next.js web app!</h1>
      <p>Your IP address: {ip}</p>
      <p>Count test 2: {visitCount}</p>
    </div>
  );
};

export default SSRPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let ip = req.headers["x-real-ip"];
  if (!ip) {
    const forwardedFor = req.headers["x-forwarded-for"];
    if (Array.isArray(forwardedFor)) {
      ip = forwardedFor.at(0);
    } else {
      ip = forwardedFor?.split(",").at(0) ?? "Unknown";
    }
  }
  const visitCountResponse = await fetch('https://peppy-jalebi-6f5a89.netlify.app/api/visit-count');
  const visitCountData = await visitCountResponse.json();
  const visitCount = visitCountData.ip;
  return {
    props: {
      ip,
      visitCount,
    },
  };
};
