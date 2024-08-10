import prisma from '@/prisma/client';

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
