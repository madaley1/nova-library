import { runMySqlQuery } from '@/utils/mysqlConection';
import { Pool } from 'mysql';

export async function getHandler(id: string, connection: Pool) {
  const sql_getTableData = `SELECT * FROM ${id};`;
  const sql_getColumns = `SELECT COLUMN_NAME FROM information_schema.columns WHERE table_schema = '${process.env.MYSQL_DATABASE}' AND table_name = '${id}';`;

  const getTableData = async () => await runMySqlQuery(sql_getTableData, connection);
  const getColumns = async () => await runMySqlQuery(sql_getColumns, connection);

  const tableData = await getTableData();
  const { results } = tableData;

  const formatColumns = async () => {
    const columnArray = (await getColumns()).results;
    const columnNames = columnArray.map((column: { COLUMN_NAME: string }) => column.COLUMN_NAME);
    return columnNames;
  };

  const formatRows = async (rows: any) => {
    const columnNames = Object.keys(rows[0]).map((entry) => {
      return entry;
    });
    const currentData = rows;
    return { columnNames, currentData };
  };

  if (Array.isArray(results)) {
    return results.length > 0 ? await formatRows(results) : await formatColumns();
  } else {
    throw new Error('MySql did not return an array, please try again later');
  }
}
