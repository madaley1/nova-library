import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getAllGames = async () => {
  return await prisma.games.findMany();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const games = await getAllGames();
  res.status(200).json(games);
}
