import prisma from '@/prisma/client';

export const getUser = async (email?: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      image: user?.image,
      companyId: user?.companyId,
    };
  } catch (error) {
    throw new Error('Failed to Get User.');
  }
};

export const getFullUser = async (email?: string) => {
  try {
    const fullUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        company: true,
      },
    });
    return fullUser;
  } catch (error) {
    throw new Error('Failed to Get Full User.');
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
