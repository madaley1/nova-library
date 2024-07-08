import { testConnection } from '@/utils/tests/jestUtils';
import { describe, expect, it } from '@jest/globals';

import { postHandler } from '../POST';

describe('post', () => {
  const tableSchema = ['id', 'string_title', 'date_release_date', 'multiSelect_genre', 'string_isbn'];
  const dataToBeSent = {
    id: 'books',
    columnNames: tableSchema,
    data: [
      {
        string_title: 'test',
        date_release_date: new Date(),
        multiSelect_genre: [],
        string_isbn: '',
      },
    ],
  };
  it('should submit post', async () => {
    const post = await postHandler(dataToBeSent, testConnection);
    expect(post).toBeTruthy();
    expect(post.results.warningCount).toBe(0);
  });
});
