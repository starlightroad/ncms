import prisma from '@/prisma/client';
import { getUserBySession } from '@/app/data/session';

export const getCardData = async () => {
  try {
    const user = await getUserBySession();
    const companyId = String(user.companyId);

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
