import { Prisma, PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getAllOfResource = async (resourceName: Prisma.ModelName) => {
  const resource = prisma[resourceName as Prisma.ModelName];
  if (!resource.findMany) throw Error('Error: findMany not found, does resource exist?');
  return await resource.findMany();
};

const validateResourceTypeExists = () => {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestedResource = req.query.id;
  console.log(req.query);
  if (Array.isArray(requestedResource)) {
    return res.status(500).json({
      message: 'Please provide a string when requesting resources',
    });
  } else if (!requestedResource) {
    return res.status(500).json({
      message: 'Please provide a string when requesting resources',
    });
  } else {
    if (!(requestedResource instanceof prisma.ModelName)) {
      return res.status(500).json({ message: 'Please provide a valid resource name' });
    }
    const resource = await getAllOfResource(requestedResource);
    return res.status(200).json(resource);
  }
}
