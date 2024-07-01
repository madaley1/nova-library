import { NextApiRequest, NextApiResponse } from 'next';

import { connection } from '@/utils/mysqlConection';

import { getHandler } from './GET';
import { postHandler } from './POST';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'GET') {
    const getData = await getHandler(id as string, connection);
    res.status(200).json(getData);
  } else if (req.method === 'POST') {
    postHandler();
  }
}
