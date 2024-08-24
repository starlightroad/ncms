import { auth } from '@/auth';
import { getUser } from '@/app/data/user';

export const getUserBySession = async () => {
  try {
    const session = await auth();
    const userEmail = String(session?.user?.email);
    const user = await getUser(userEmail);

    return user;
  } catch (error) {
    throw new Error('Failed to Get User from Session.');
  }
};
