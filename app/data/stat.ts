import prisma from '@/prisma/client';
import { getUserBySession } from '@/app/data/session';

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
    const user = await getUserBySession();

    const stats = await prisma.mapLoad.findMany({
      where: {
        companyId: String(user?.companyId),
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
