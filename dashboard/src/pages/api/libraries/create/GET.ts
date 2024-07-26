import { connection } from '@/utils/mysqlConection';
import { NextApiRequest, NextApiResponse } from 'next';

const sql_getTemplates = 'SELECT * FROM template_store;';
export function getHandler(req: NextApiRequest, res: NextApiResponse) {
  connection.query(sql_getTemplates, (error, results, fields) => {
    if (error) res.status(500).json({ message: 'Something went wrong, see error', error });
    res.status(200).json(results);
  });
}
