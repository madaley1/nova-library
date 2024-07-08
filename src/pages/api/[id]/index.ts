import { NextApiRequest, NextApiResponse } from 'next';

import { connection } from '@/utils/mysqlConection';

import { getHandler } from './GET';
import { postHandler } from './POST';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { body } = req;
  if (req.method === 'GET') {
    const getData = await getHandler(id as string, connection);
    res.status(200).json(getData);
  } else if (req.method === 'POST') {
    const postInputData = {
      id,
      columnNames: Array<string>(),
      data: body.data,
    };
    if (!body.columnNames) {
      const keys = Object.keys(body.data[0]);
      postInputData.columnNames = keys;
    } else {
      postInputData.columnNames = body.columnNames;
    }
    const postData = await postHandler(postInputData, connection);
    res.status(200).json(postData);
  }
}
