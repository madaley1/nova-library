import { afterAll, describe, expect, it } from '@jest/globals';
import { connection, runMySqlQuery } from '../mysqlConection';

import { testConnection } from '@/utils/test/jestSetup';

afterAll(() => {
  testConnection.end();
});

describe('mysqlConnection', () => {
  it('should successfully query', () => {
    connection.query('SELECT * FROM information_schema.tables', (err, rows, fields) => {
      connection.end();
      expect(err).toBe(null);
      expect(rows).toBeTruthy;
    });
  });

  it('testConnection should work', () => {
    testConnection.query('SELECT * FROM information_schema.tables', (err, rows, fields) => {
      testConnection.end();
      expect(err).toBe(null);
      expect(rows).toBeTruthy;
    });
  });

  it('should return query results when valid query is passed', async () => {
    expect(
      Object.keys(await runMySqlQuery('SELECT * FROM information_schema.tables', testConnection)).length > 0,
    ).toBeTruthy();

    const queryResults = await runMySqlQuery('SELECT * FROM information_schema.tables', testConnection);

    expect(queryResults?.error).toBeFalsy();

    expect(queryResults?.results).toBeTruthy();
    expect(typeof queryResults?.results === 'object').toBeTruthy();

    expect(queryResults?.fields).toBeTruthy();
    expect(typeof queryResults?.fields === 'object').toBeTruthy();
  });
});
