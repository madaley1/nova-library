import { connection, testConnection } from '@/utils/mysqlConection';
import { afterAll, describe, expect, it } from '@jest/globals';

afterAll(() => {
  connection.end();
  testConnection.end();
});
