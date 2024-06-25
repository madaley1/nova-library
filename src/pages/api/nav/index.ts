import { NextApiRequest, NextApiResponse } from 'next';

import { connection, runMySqlQuery } from '@/utils/mysqlConection';

export const sql_getAllTables = `SELECT table_name FROM information_schema.tables
WHERE table_schema = '${process.env.MYSQL_DATABASE}';`;

export function processResults(results: any) {
  return Object.entries(results)
    .filter((entry: [string, any]) => entry[1] && entry[1].table_name !== 'template_store')
    .map((entry) => {
      return entry[1];
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const queryResults = await runMySqlQuery(sql_getAllTables, connection);
  if (queryResults.error)
    res.status(500).json({ message: 'Something went wrong, see error', error: queryResults.error });
  const { results, fields } = queryResults;
  const filteredResults = processResults(results);

  return res.status(200).json(filteredResults);
}
