import { NextApiRequest, NextApiResponse } from 'next';

import { connection } from '@/utils/mysqlConection';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const sql_getTableData = `SELECT * FROM ${id};`;
  const sql_getColumns = `SELECT COLUMN_NAME FROM information_schema.columns WHERE table_schema = '${process.env.MYSQL_DATABASE}' AND table_name = '${id}';`;
  const getColumns = () =>
    connection.query(sql_getColumns, (error, rows) => {
      if (error) res.status(500).json({ message: 'An error has ocurred, please see error message', error });

      res.status(200).json(rows);
    });
  const getTableData = () =>
    connection.query(sql_getTableData, (error, rows) => {
      if (error) res.status(500).json({ message: 'An error has ocurred, please see error message', error });
      if (Array.isArray(rows)) {
        rows.length > 0 ? res.status(200).json(rows) : getColumns();
      }
    });

  getTableData();
}
