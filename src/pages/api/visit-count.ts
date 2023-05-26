import { NextApiRequest, NextApiResponse } from 'next';
import {incrementVisitCount} from '../../lib/visitCountUtils';
import handler from './hello';

// In-memory storage for visit counts

const visitCountHandler = (req: NextApiRequest, res: NextApiResponse) => {
  // const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  // const { ipAddress } = req.query
  const ipAddress = '123.23.12.32'

  const visitCount = incrementVisitCount(ipAddress||'')

  res.status(200).json({ visitCount });
};

export default visitCountHandler;


