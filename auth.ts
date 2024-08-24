import NextAuth from 'next-auth';
import prisma from '@/prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import authConfig from '@/auth.config';
import { getFullUser } from '@/app/data/user';
import { comparePasswords } from '@/app/lib/bcrypt';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
  pages: {
    signIn: '/signin',
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        let user = null;

        try {
          user = await getFullUser(String(credentials.email));

          const passwordsMatch = await comparePasswords(
            String(credentials.password),
            String(user?.password),
          );

          if (!passwordsMatch || !user?.companyId) return null;

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
