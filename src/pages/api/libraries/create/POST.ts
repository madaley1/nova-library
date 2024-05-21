import { connection } from '@/utils/mysqlConection';
import { NextApiRequest, NextApiResponse } from 'next';


export function postHandler(req: NextApiRequest, res: NextApiResponse){
  const sql_createNewTable = `CREATE TABLE ${req.body.tableName} ()`
  return {}
}