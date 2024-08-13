import prisma from '@/prisma/client';

export const getLocations = async () => {
  try {
    const locations = await prisma.location.findMany();
    return locations;
  } catch (error) {
    throw new Error('Failed to fetch locations.');
  }
};
