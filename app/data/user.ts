import { cache } from 'react';
import prisma from '@/prisma/client';
import { verifySession } from '@/app/data/session';

export const getUserByEmail = async (email?: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    throw new Error('Failed to Get User.');
  }
};

export const getCurrentUser = cache(async () => {
  try {
    const session = await verifySession();
    const currentUser = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        name: true,
        email: true,
        image: true,
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return currentUser;
  } catch (error) {
    throw new Error('Failed to Get Current User.');
  }
});

export const createUser = async (email: string, hashedPassword: string) => {
  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        companyId: null,
      },
    });
  } catch (error) {
    throw new Error('Failed to Create User.');
  }
};
