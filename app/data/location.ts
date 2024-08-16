import prisma from '@/prisma/client';

export const getLocations = async () => {
  try {
    const locations = await prisma.location.findMany();
    return locations;
  } catch (error) {
    throw new Error('Failed to fetch locations.');
  }
};

export const getLocation = async (locationId: string) => {
  try {
    const location = await prisma.location.findUnique({ where: { id: locationId } });
    return location;
  } catch (error) {
    throw new Error('Failed to fetch location.');
  }
};
