import mysql, { Connection } from 'mysql';

export const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: parseInt(`${process.env.MYSQL_EXTERNAL_PORT || 3306}`),
  database: process.env.MYSQL_DATABASE,
});

connection.connect((error) => {
  if (error) {
    throw new Error('Failed to connect to mysql', error);
  }
});

export const testConnection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: parseInt(`${process.env.MYSQL_EXTERNAL_PORT || 3306}`),
  database: 'testDB',
});

export function runMySqlQuery(query: string, connection: Connection) {
  return new Promise<Record<string, any>>((res, rej) => {
    connection.query(query, (error, results, fields) => {
      if (error) rej(error);
      res({ results, fields });
    });
  });
}
