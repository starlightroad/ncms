import prisma from '@/prisma/client';
import { ITEMS_PER_PAGE } from '@/app/lib/constants';
import { getCurrentUser } from '@/app/data/user';

export const getLocations = async () => {
  try {
    const currentUser = await getCurrentUser();
    const locations = await prisma.location.findMany({
      where: { companyId: currentUser?.company?.id },
    });
    return locations;
  } catch (error) {
    throw new Error('Failed to fetch locations.');
  }
};

export const getLocation = async (locationId: string) => {
  try {
    const currentUser = await getCurrentUser();
    const location = await prisma.location.findUnique({
      where: { companyId: currentUser?.company?.id, id: locationId },
    });
    return location;
  } catch (error) {
    throw new Error('Failed to fetch location.');
  }
};

export const getLocationPages = async (query?: string) => {
  try {
    const currentUser = await getCurrentUser();
    const count = await prisma.location.count({
      where: {
        companyId: currentUser?.company?.id,
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
    const currentUser = await getCurrentUser();
    const locations = await prisma.location.findMany({
      where: {
        companyId: currentUser?.company?.id,
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
