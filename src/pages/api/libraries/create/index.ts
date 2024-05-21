import { NextApiRequest, NextApiResponse } from 'next';

import { postHandler } from './POST';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST'){
    const postResponse = postHandler(req, res)
  }
  res.status(200).json({ message: 'Welcome to Nova Library!' });
}
