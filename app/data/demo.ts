import prisma from '@/prisma/client';

export const getDemoCompanyId = async () => {
  try {
    const company = await prisma.company.findUnique({ where: { name: 'Acme Networks' } });
    return company?.id;
  } catch (error) {
    throw new Error('Failed to Get Demo Company ID.');
  }
};
