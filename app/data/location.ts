import prisma from '@/prisma/client';
import { ITEMS_PER_PAGE } from '@/app/lib/constants';
import { getUserBySession } from '@/app/data/session';

export const getLocations = async () => {
  try {
    const user = await getUserBySession();
    const locations = await prisma.location.findMany({
      where: { companyId: user?.companyId?.toString() },
    });
    return locations;
  } catch (error) {
    throw new Error('Failed to fetch locations.');
  }
};

export const getLocation = async (locationId: string) => {
  try {
    const user = await getUserBySession();
    const location = await prisma.location.findUnique({
      where: { companyId: user?.companyId?.toString(), id: locationId },
    });
    return location;
  } catch (error) {
    throw new Error('Failed to fetch location.');
  }
};

export const getLocationPages = async (query?: string) => {
  try {
    const user = await getUserBySession();
    const count = await prisma.location.count({
      where: {
        companyId: user?.companyId?.toString(),
        OR: [
          {
            name: {
              startsWith: query,
              mode: 'insensitive',
            },
          },
          {
            street: {
              startsWith: query,
              mode: 'insensitive',
            },
          },
          {
            city: {
              startsWith: query,
              mode: 'insensitive',
            },
          },
          {
            state: {
              startsWith: query,
              mode: 'insensitive',
            },
          },
          {
            zip: {
              startsWith: query,
            },
          },
        ],
      },
    });
    const pages = Math.ceil(count / ITEMS_PER_PAGE);

    return pages;
  } catch (error) {
    throw new Error('Failed to Fetch Number of Locations.');
  }
};

export const getFilteredLocations = async (currentPage: number, query: string) => {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = currentPage * ITEMS_PER_PAGE;

  try {
    const user = await getUserBySession();
    const locations = await prisma.location.findMany({
      where: {
        companyId: user?.companyId?.toString(),
        OR: [
          {
            name: {
              startsWith: query,
              mode: 'insensitive',
            },
          },
          {
            street: {
              startsWith: query,
              mode: 'insensitive',
            },
          },
          {
            city: {
              startsWith: query,
              mode: 'insensitive',
            },
          },
          {
            state: {
              startsWith: query,
              mode: 'insensitive',
            },
          },
          {
            zip: {
              startsWith: query,
            },
          },
        ],
      },
      skip,
      take,
    });
    return locations;
  } catch (error) {
    throw new Error('Failed to Get Filtered Locations.');
  }
};
