import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const verifySession = async () => {
  try {
    const session = await auth();

    if (!session?.user) {
      redirect('/signin');
    }

    return {
      userId: session.user.id,
    };
  } catch (error) {
    throw new Error('Failed to Verify Session.');
  }
};
