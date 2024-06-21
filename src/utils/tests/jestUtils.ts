import mysql from 'mysql';

export const testConnection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: parseInt(`${process.env.MYSQL_EXTERNAL_PORT || 3306}`),
  database: 'testDB',
});

// const globalSetup = () => {
//   testConnection;
// };

// export default globalSetup;
