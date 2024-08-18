import prisma from '@/prisma/client';

export const getCardData = async () => {
  try {
    const totalCircuits = prisma.circuit.count();
    const totalLocations = prisma.location.count();
    const totalVendors = prisma.vendor.count();

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
