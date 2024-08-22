import prisma from '@/prisma/client';
import { ITEMS_PER_PAGE } from '@/app/lib/constants';
import { getDemoCompanyId } from '@/app/data/demo';

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

export const getLocationPages = async () => {
  try {
    const count = await prisma.location.count();
    const pages = Math.ceil(count / ITEMS_PER_PAGE);

    return pages;
  } catch (error) {
    throw new Error('Failed to Fetch Number of Locations.');
  }
};

export const getFilteredLocations = async (currentPage: number) => {
  const demoCompanyId = await getDemoCompanyId();
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = currentPage * ITEMS_PER_PAGE;

  try {
    const locations = await prisma.location.findMany({
      where: {
        companyId: demoCompanyId,
      },
      skip,
      take,
    });
    return locations;
  } catch (error) {
    throw new Error('Failed to Get Filtered Locations.');
  }
};
