import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getAllBooks = async () => {
  return await prisma.books.findMany();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const books = await getAllBooks();
  res.status(200).json(books);
}
