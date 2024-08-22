import prisma from '@/prisma/client';
import { ITEMS_PER_PAGE } from '@/app/lib/constants';
import { getDemoCompanyId } from '@/app/data/demo';

export const getVendors = async () => {
  try {
    const vendors = await prisma.vendor.findMany();
    return vendors;
  } catch (error) {
    throw new Error('Failed to fetch vendors.');
  }
};

export const getVendorById = async (id: string) => {
  try {
    const vendor = await prisma.vendor.findUnique({ where: { id } });
    return vendor;
  } catch (error) {
    throw new Error('Failed to fetch vendor.');
  }
};

export const getVendorPages = async () => {
  try {
    const count = await prisma.vendor.count();
    const pages = Math.ceil(count / ITEMS_PER_PAGE);

    return pages;
  } catch (error) {
    throw new Error('Failed to Fetch Number of Vendors.');
  }
};

export const getFilteredVendors = async (currentPage: number, query: string) => {
  const demoCompanyId = await getDemoCompanyId();
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = currentPage * ITEMS_PER_PAGE;

  try {
    const vendors = await prisma.vendor.findMany({
      where: {
        companyId: demoCompanyId,
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
