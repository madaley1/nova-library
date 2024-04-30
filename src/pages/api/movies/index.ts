import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const getAllmovies = async () => {
  return await prisma.movies.findMany();
}

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const movies = await getAllmovies();
  res.status(200).json(movies)
}