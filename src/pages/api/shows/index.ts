import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getAllShows = async () => {
  return await prisma.shows.findMany();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const shows = await getAllShows();
  res.status(200).json(shows);
}
