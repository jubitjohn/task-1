import React from 'react';
import { NextPage } from 'next';
import axios from 'axios';

export interface HomeProps {
  ipAddress: string;
  visitCount: number;
}

const Home: NextPage<HomeProps> = ({ ipAddress, visitCount }) => {
  return (
    <div>
      <h1>Welcome to my Next.js web app!</h1>
      <p>Your IP address: {ipAddress}</p>
      <p>Your Website visit count: {visitCount}</p>
    </div>
  );
};


export const getServerSideProps = async () => {
  try {
    const response = await axios.get('http://ip-api.com/json/');
    const ipAddress = response.data.query;

    const visitCountResponse = await fetch('http://localhost:3000/api/visit-count');
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
