import { Prisma, PrismaClient } from '@prisma/client';

export const getAllOfResource = async (prisma: PrismaClient, resourceName: Prisma.ModelName) => {
  const resource = prisma[resourceName];
  if (resource.findMany) {
    return await resource.findMany();
  } else {
    throw Error('Error: findMany not found, does resource exist?');
  }
};

export const getSpecificRecord = async (prisma: PrismaClient, resourceName: Prisma.ModelName, id: string) => {
  const resource = prisma[resourceName];
  if (resource.findMany) {
    return await resource.findFirst({
      where: {
        id,
      },
    });
  } else {
    throw Error('Error: findFirst not found, does resource exist?');
  }
};
