import { NextApiRequest, NextApiResponse } from 'next';

import { connection } from '@/utils/mysqlConection';
import { log } from 'console';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const sql_getTableData = `SELECT * FROM ${id};`;
  const sql_getColumns = `SELECT COLUMN_NAME FROM information_schema.columns WHERE table_schema = '${process.env.MYSQL_DATABASE}' AND table_name = '${id}';`;
  const getColumns = () =>
    connection.query(sql_getColumns, (error, rows) => {
      if (error) res.status(500).json({ message: 'An error has ocurred, please see error message', error });
      const columnNames = rows.map((column: { COLUMN_NAME: string }) => column.COLUMN_NAME);
      log(columnNames);
      res.status(200).json({ columnNames, currentData: [] });
    });
  const getTableData = () =>
    connection.query(sql_getTableData, (error, rows) => {
      if (error) res.status(500).json({ message: 'An error has ocurred, please see error message', error });
      const formatRows = (rows: Record<string, any>) => {
        const columnNames = Object.keys(rows[0]).map((entry) => {
          return entry;
        });
        const currentData = rows;
        res.status(200).json({ columnNames, currentData });
      };
      if (Array.isArray(rows)) {
        rows.length > 0 ? formatRows(rows) : getColumns();
      }
    });

  getTableData();
}
