import prisma from '@/prisma/client';
import { getDemoCompanyId } from '@/app/data/demo';

export const getMapLoadsLast6Months = async () => {
  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  let prevYear = null;

  let gte = null;
  let lte = null;

  if (currentMonth - 5 < 0) {
    prevYear = currentYear - 1;
    gte = 12 + (currentMonth - 5);
    lte = currentMonth;
  } else {
    gte = currentMonth;
    lte = currentMonth - 5;
  }

  try {
    const demoCompanyId = await getDemoCompanyId();
    const stats = await prisma.mapLoad.findMany({
      where: {
        companyId: demoCompanyId,
        OR: [
          {
            monthId: { gte },
            year: { gte: prevYear ?? currentYear },
          },
          {
            monthId: { lte },
            year: { lte: currentYear },
          },
        ],
      },
      orderBy: [{ year: 'desc' }, { monthId: 'desc' }, { day: 'desc' }],
      take: 6,
    });

    return stats;
  } catch (error) {
    throw new Error('Failed to Get Map Loads.');
  }
};
