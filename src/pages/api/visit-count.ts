import { NextApiRequest, NextApiResponse } from 'next';

// In-memory storage for visit counts
const visitCounts: { [ip: string]: number } = {};

const visitCountHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const ip = req.headers['x-forwarded-for'] || '';

  // Extract the first IP address if it is an array
  const ipAddressToUse = Array.isArray(ip) ? ip[0] : ip;

  // Increment visit count for the IP address
  if (ipAddressToUse) {
    visitCounts[ipAddressToUse] = visitCounts[ipAddressToUse] ? visitCounts[ipAddressToUse] + 1 : 1;
  }

  const visitCount = visitCounts[ipAddressToUse];

  res.status(200).json({ visitCount });
};

export default visitCountHandler;



