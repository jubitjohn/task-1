import { NextApiRequest, NextApiResponse } from 'next';
import { HomeProps } from '../index';

// In-memory storage for visit counts
const visitCounts: { [ipAddress: string]: number } = {};

const visitCountHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { ip } = req.body as HomeProps;
  const ipAddress = ip; // Store the value of 'ip' in 'ipAddress'
  // const ipAddress = req.headers['x-forwarded-for'] || '';

  // Extract the first IP address if it is an array
  const ipAddressToUse = Array.isArray(ipAddress) ? ipAddress[0] : ipAddress;

  // Increment visit count for the IP address
  if (ipAddressToUse) {
    visitCounts[ipAddressToUse] = visitCounts[ipAddressToUse] ? visitCounts[ipAddressToUse] + 1 : 1;
  }

  const visitCount = visitCounts[ipAddressToUse];

  res.status(200).json({ ipAddress });
};

export default visitCountHandler;



