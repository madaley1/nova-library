import { runMySqlQuery } from '@/utils/mysqlConection';
import { testConnection } from '@/utils/tests/jestUtils';
import { describe, expect, it } from '@jest/globals';
import { processResults, sql_getAllTables } from '..';

describe('nav api', () => {
  it('nav query should work', async () => {
    const queryResults = await runMySqlQuery(sql_getAllTables, testConnection);
    expect(queryResults.error).toBeFalsy;
  });

  it('should process query results', async () => {
    const queryResults = await runMySqlQuery(sql_getAllTables, testConnection);

    const processed = processResults(queryResults.results);
    expect(processed).toBeTruthy();
    expect(Array.isArray(processed)).toBeTruthy();
  });
});
