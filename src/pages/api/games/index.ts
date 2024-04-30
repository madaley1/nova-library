import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const getAllgames = async () => {
  return await prisma.games.findMany();
}

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const games = await getAllgames();
  res.status(200).json(games)
}