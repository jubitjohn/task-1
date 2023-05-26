import { NextApiRequest, NextApiResponse } from 'next';

interface VisitCounts {
  [key: string]: number;
}

const visitCountHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { ipAddress } = req.query;

  let visitCounts: VisitCounts = {};
  if (typeof window !== 'undefined') {
    // Client environment
    visitCounts = JSON.parse(localStorage.getItem('visitCounts') || '{}');
  }

  const ipAddressToUse = Array.isArray(ipAddress) ? ipAddress[0] : ipAddress;
  console.log('IP Address:', ipAddressToUse);

  if (ipAddressToUse) {
    visitCounts[ipAddressToUse] = visitCounts[ipAddressToUse] ? visitCounts[ipAddressToUse] + 1 : 1;
  }

  if (typeof window !== 'undefined') {
    // Client environment
    localStorage.setItem('visitCounts', JSON.stringify(visitCounts));
  }

  const visitCount = visitCounts[ipAddressToUse || ''];

  res.status(200).json({ visitCount });
};

export default visitCountHandler;
