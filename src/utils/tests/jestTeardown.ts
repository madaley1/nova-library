import { connection } from '@/utils/mysqlConection';
import { testConnection } from './jestUtils';
// import { afterAll, describe, expect, it } from '@jest/globals';

const globalTeardown = () => {
  connection.end();
  testConnection.end();
};

export default globalTeardown;
