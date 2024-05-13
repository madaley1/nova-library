import { Prisma, PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getAllOfResource = async (resourceName: Prisma.ModelName) => {
  const resource = prisma[resourceName];
  if (resource.findMany) {
    return await resource.findMany();
  } else {
    throw Error('Error: findMany not found, does resource exist?');
  }
};

const validateResourceTypeExists = (resourceType: unknown): resourceType is Prisma.ModelName => {
  return typeof resourceType === 'string' && Object.keys(Prisma.ModelName).includes(resourceType);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestedResource = req.query.id;
  if (!validateResourceTypeExists(requestedResource)) {
    res.status(500).json({
      message: 'Please use a valid resource type',
    });
  } else {
    const resource = await getAllOfResource(requestedResource);
    return res.status(200).json(resource);
  }
}
