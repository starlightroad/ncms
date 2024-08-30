import prisma from '@/prisma/client';
import { getCurrentUser } from '@/app/data/user';

export const getMapLoadsLast6Months = async () => {
  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const prevYear = (currentMonth - 5 < 0 && currentYear - 1) || null;

  try {
    const currentUser = await getCurrentUser();

    const stats = await prisma.mapLoad.groupBy({
      by: ['monthId', 'year'],
      where: { companyId: currentUser?.company?.id },
      orderBy: [{ year: 'desc' }, { monthId: 'desc' }],
      _sum: {
        count: true,
      },
      having: {
        AND: [
          {
            year: {
              lte: currentYear,
              gte: prevYear ?? currentYear,
            },
          },
          {
            monthId: {
              lte: currentMonth,
            },
          },
        ],
      },
      take: 6,
    });

    return stats;
  } catch (error) {
    throw new Error('Failed to Get Map Loads.');
  }
};
