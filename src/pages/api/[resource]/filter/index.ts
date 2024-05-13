import { Prisma, PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateResourceTypeExists } from '..';

const prisma = new PrismaClient();

const getFilteredResourceList = async (
  prisma: PrismaClient,
  resourceName: Prisma.ModelName,
  column: string,
  value: string,
) => {
  const resource = prisma[resourceName];
  if (resource.findMany) {
    const result = await resource.findMany({
      where: {
        [column]: {
          startsWith: value,
        },
      },
    });
    return result;
  } else {
    throw Error('Error: findMany not found, does resource exist?');
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();

  if (Object.keys(req.query).length <= 1)
    res.status(500).json({
      message:
        'Please include the "column" parameter with your request, as well as the "value" parameter. If either of these are missing, it is not possible to filter for values',
    });
  const { resource, column, value } = req.query;
  if (!validateResourceTypeExists(resource)) {
    return res.status(500).json({
      message: 'Please use a valid resource type',
    });
  }
  if (typeof column !== 'string') {
    return res.status(500).json({
      message: 'Please use a string for the column name',
    });
  }
  if (typeof value !== 'string') {
    return res.status(500).json({
      message: 'Please use a string for the value',
    });
  }
  const filteredList = await getFilteredResourceList(prisma, resource, column, value);
  res.status(200).json({
    resource: filteredList,
  });
}
prisma.$disconnect;
