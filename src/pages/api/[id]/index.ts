import { NextApiRequest, NextApiResponse } from 'next';

import { connection } from '@/utils/mysqlConection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const sql_getTableData = `SELECT * FROM ${id}`;
  connection.query(sql_getTableData, (error, results) => {
    if (error) res.status(500).json({ message: 'Something went wrong, see error', error });
    res.status(200).json({ data: results });
  });
}
