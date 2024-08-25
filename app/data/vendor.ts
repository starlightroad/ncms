import prisma from '@/prisma/client';
import { ITEMS_PER_PAGE } from '@/app/lib/constants';
import { getUserBySession } from '@/app/data/session';

export const getVendors = async () => {
  try {
    const user = await getUserBySession();
    const vendors = await prisma.vendor.findMany({ where: { companyId: String(user.companyId) } });
    return vendors;
  } catch (error) {
    throw new Error('Failed to fetch vendors.');
  }
};

export const getVendorById = async (id: string) => {
  try {
    const user = await getUserBySession();
    const vendor = await prisma.vendor.findUnique({
      where: { companyId: String(user.companyId), id },
    });
    return vendor;
  } catch (error) {
    throw new Error('Failed to fetch vendor.');
  }
};

export const getVendorPages = async () => {
  try {
    const user = await getUserBySession();
    const count = await prisma.vendor.count({ where: { companyId: String(user.companyId) } });
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
    const user = await getUserBySession();
    const vendors = await prisma.vendor.findMany({
      where: {
        companyId: String(user.companyId),
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
