import prisma from '@/prisma/client';
import { getCurrentUser } from '@/app/data/user';

export const getCardData = async () => {
  try {
    const currentUser = await getCurrentUser();
    const companyId = currentUser?.company?.id;

    const totalCircuits = prisma.circuit.count({ where: { companyId } });
    const totalLocations = prisma.location.count({ where: { companyId } });
    const totalVendors = prisma.vendor.count({ where: { companyId } });

    const [circuitCount, locationCount, vendorCount] = await Promise.all([
      totalCircuits,
      totalLocations,
      totalVendors,
    ]);

    return {
      circuitCount,
      locationCount,
      vendorCount,
    };
  } catch (error) {
    throw new Error('Failed to Fetch Card Data.');
  }
};
