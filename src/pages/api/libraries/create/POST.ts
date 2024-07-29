import { FieldType, libraryTemplate } from '@/utils/libraries/templates';
import { connection } from '@/utils/mysqlConection';
import { NextApiRequest, NextApiResponse } from 'next';

export function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const { title, fields }: libraryTemplate = JSON.parse(req.body);
  const createTable = `CREATE TABLE ${title} `;
  const columns = `(${Object.entries(fields)
    .map((entry) => {
      const [column, type] = entry;
      const mySqlType = (type: FieldType) => {
        if (type === 'string' || type === 'select') return 'varchar(265)';
        else if (type === 'multiSelect') return 'varchar(1000)';
        else if (type === 'number') return 'INT';
        else if (type === 'date') return 'DATE';
        else return 'varchar(265)';
      };
      if (column === 'id') return 'id INT AUTO_INCREMENT PRIMARY KEY';
      else return `${type}_${column} ${mySqlType(type)}`;
    })
    .join(', ')});`;
  const query = createTable + columns;
  return connection.query(query, (error, results, fields) => {
    if (error) res.status(500).json({ message: 'Something went wrong, see error', error });
    res.status(200).json({ message: `${title} table created, redirecting` });
  });
}
