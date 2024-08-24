import prisma from '@/prisma/client';

export const getUser = async (email?: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    throw new Error('Failed to Get User.');
  }
};

export const getUserAndCompany = async (email?: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        company: true,
      },
    });
    return user;
  } catch (error) {
    throw new Error('Failed to Get User.');
  }
};

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
