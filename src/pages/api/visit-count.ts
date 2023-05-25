import { NextApiRequest, NextApiResponse } from 'next';

interface VisitCounts {
  [key: string]: number;
}

const visitCountHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { ipAddress } = req.query;

  // Get the visit counts from server local storage
  let visitCounts: VisitCounts = {};
  if (typeof window === 'undefined') {
    // Server environment
    visitCounts = JSON.parse(localStorage.getItem('visitCounts') || '{}');
  }

  // Extract the first IP address if it is an array
  const ipAddressToUse = Array.isArray(ipAddress) ? ipAddress[0] : ipAddress;
  console.log('IP Address:', ipAddressToUse);

  // Increment visit count for the IP address
  if (ipAddressToUse) {
    visitCounts[ipAddressToUse] = visitCounts[ipAddressToUse] ? visitCounts[ipAddressToUse] + 1 : 1;
  }

  // Save the updated visit counts to server local storage
  if (typeof window === 'undefined') {
    // Server environment
    localStorage.setItem('visitCounts', JSON.stringify(visitCounts));
  }

  const visitCount = visitCounts[ipAddressToUse || ''];

  res.status(200).json({ visitCount });
};

export default visitCountHandler;
