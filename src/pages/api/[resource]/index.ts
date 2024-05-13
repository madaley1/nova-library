import { Prisma, PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllOfResource, getSpecificRecord } from './GET';

export const validateResourceTypeExists = (resourceType: unknown): resourceType is Prisma.ModelName => {
  return typeof resourceType === 'string' && Object.keys(Prisma.ModelName).includes(resourceType);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();

  const requestedResource = req.query.resource;
  if (!validateResourceTypeExists(requestedResource)) {
    return res.status(500).json({
      message: 'Please use a valid resource type',
    });
  }
  switch (req.method) {
    case 'GET':
      if (Object.keys(req.query).length === 0) {
        return res
          .status(500)
          .json({ message: 'Something has gone wrong and the ID was not received, please try again later' });
      } else if (Object.keys(req.query).length === 1) {
        return res.status(200).json(await getAllOfResource(prisma, requestedResource));
      } else if (req.query.id) {
        const { id } = req.query;
        if (typeof id !== 'string' || Array.isArray(id)) {
          return res.status(500).json({ message: 'Please submit a valid string id' });
        } else {
          return res.status(200).json(await getSpecificRecord(prisma, requestedResource, id));
        }
      }
      break;
  }
  return res.status(500).json({ message: 'query did not match any available methods, please try again' });
}
