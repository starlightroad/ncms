import prisma from '@/prisma/client';
import { ITEMS_PER_PAGE } from '@/app/lib/constants';
import { getCurrentUser } from '@/app/data/user';

export const getVendors = async () => {
  try {
    const currentUser = await getCurrentUser();
    const vendors = await prisma.vendor.findMany({
      where: { companyId: currentUser?.company?.id },
    });
    return vendors;
  } catch (error) {
    throw new Error('Failed to fetch vendors.');
  }
};

export const getVendorById = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();
    const vendor = await prisma.vendor.findUnique({
      where: { companyId: currentUser?.company?.id, id },
    });
    return vendor;
  } catch (error) {
    throw new Error('Failed to fetch vendor.');
  }
};

export const getVendorPages = async (query?: string) => {
  try {
    const currentUser = await getCurrentUser();
    const count = await prisma.vendor.count({
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
            phone: {
              startsWith: query,
            },
          },
        ],
      },
    });
    const pages = Math.ceil(count / ITEMS_PER_PAGE);

    return pages;
  } catch (error) {
    throw new Error('Failed to Fetch Number of Vendors.');
  }
};

export const getFilteredVendors = async (currentPage: number, query: string) => {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = currentPage * ITEMS_PER_PAGE;

  try {
    const currentUser = await getCurrentUser();
    const vendors = await prisma.vendor.findMany({
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
            phone: {
              startsWith: query,
            },
          },
        ],
      },
      skip,
      take,
    });
    return vendors;
  } catch (error) {
    throw new Error('Failed to Get Filtered Vendors.');
  }
};
