import { compileMultiSelect } from '@/utils/libraries/multiSelect';
import { runMySqlQuery } from '@/utils/mysqlConection';
import dayjs from 'dayjs';
import { Pool } from 'mysql';

const queryCreator = (id: string, columnNames: string[], data: Record<string, unknown>[]) => {
  const queryString = `INSERT INTO ${id} (${columnNames.join(', ')}) VALUES `;
  const valuesString = `${data
    .map(
      (item) =>
        `(${columnNames
          .map((name) => {
            const value = item[name];

            if (typeof value === 'string') {
              const isDay = dayjs(value).isValid();
              if (isDay) return `"${value.split('T')[0]}"`;
              return `"${value || ''}"`;
            } else if (typeof value === 'number') {
              return value;
            } else if (value instanceof Date) {
              return `"${value.toISOString().split('T')[0]}"`;
            } else {
              return value || 'null';
            }
          })
          .join(', ')})`,
    )
    .join(', ')};`;
  return queryString + valuesString;
};

export async function postHandler(postData: Record<string, any>, connection: Pool) {
  const { id, columnNames, data } = postData;
  if (columnNames.includes('id')) columnNames.splice(columnNames.indexOf('id'), 1);
  const newData = data.fieldValues.map((item: Record<string, any>) => {
    const entries = Object.entries(item);
    const newRecord: Record<string, any> = {};
    entries.forEach((entry) => {
      if (entry[0].startsWith('multiSelect_')) {
        if (!Array.isArray(entry[1])) throw new Error('multiselect fields should only be arrays');
        const multiSelectString = compileMultiSelect(entry[1]);
        newRecord[entry[0]] = multiSelectString;
      } else {
        newRecord[entry[0]] = entry[1];
      }
    });
    return newRecord;
  });
  const query = queryCreator(id, columnNames, newData);
  const queryResults = await runMySqlQuery(query, connection);
  return queryResults;
}
