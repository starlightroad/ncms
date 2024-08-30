'use server';

import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/app/data/user';

export const updateMapLoadsCountAction = async () => {
  try {
    const currentUser = await getCurrentUser();
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];

    const existingEntry = await prisma.mapLoad.findFirst({
      where: {
        companyId: currentUser?.company?.id,
        day,
        monthId: month,
        year,
      },
    });

    if (!existingEntry) {
      await prisma.mapLoad.create({
        data: {
          companyId: String(currentUser?.company?.id),
          day,
          monthId: month,
          year,
          count: 1,
        },
      });
    } else {
      await prisma.mapLoad.update({
        where: {
          id: existingEntry.id,
          companyId: existingEntry.companyId,
          day,
          monthId: month,
          year,
        },
        data: {
          count: existingEntry.count + 1,
        },
      });
    }
  } catch (error) {
    const errorMessage = 'Failed to Update Map Loads Count.';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  revalidatePath('/dashboard');
};
