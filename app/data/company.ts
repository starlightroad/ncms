import prisma from '@/prisma/client';

export const getCompanyById = async (id: string) => {
  try {
    const company = await prisma.company.findUnique({
      where: {
        id,
      },
    });

    return company;
  } catch (error) {
    throw new Error('Failed to Get Company by ID.');
  }
};
