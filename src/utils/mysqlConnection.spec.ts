import { describe, expect, it } from '@jest/globals';
import { connection } from './mysqlConection';

describe('mysqlConnection', () => {
  it('should successfully query', () => {
    connection.query('SELECT * FROM information_schema.tables', (err, rows, fields) => {
      expect(err).toBe(null);
      expect(rows).toBeTruthy;
      connection.end();
    });
  });
});
