import { NextApiRequest, NextApiResponse } from 'next';

import { connection } from '@/utils/mysqlConection';

const sql_getAllTables = `SELECT table_name FROM information_schema.tables
WHERE table_schema = '${process.env.MYSQL_DATABASE}';`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return connection.query(sql_getAllTables, (error, results, fields) => {
    if (error) res.status(500).json({ message: 'Something went wrong, see error', error });
    const filteredResults = Object.entries(results)
      .filter((entry: [string, any]) => entry[1] && entry[1].table_name !== 'template_store')
      .map((entry) => {
        return entry[1];
      });
    res.status(200).json(filteredResults);
  });
}
