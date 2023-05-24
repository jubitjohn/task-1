import React from 'react';
import { NextPage } from 'next';
import axios from 'axios';

interface HomeProps {
  ipAddress: string;
}

const Home: NextPage<HomeProps> = ({ ipAddress }) => {
  return (
    <div>
      <h1>Welcome to my Next.js web app!</h1>
      <p>Your IP address: {ipAddress}</p>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const response = await axios.get('http://api.ipstack.com/check?access_key=b766c05cdface9425fc691a378cd35a0');
    const ipAddress = response.data.ip;
    return {
      props: {
        ipAddress,
      },
    };
  } catch (error) {
    console.error('Failed to fetch IP address:', error);
    
  }
};

export default Home;
