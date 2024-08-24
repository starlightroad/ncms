import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { NextResponse } from 'next/server';

const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (request) => {
  const session = await middleware();
  const reqUrl = request.nextUrl;

  if (!session?.user) {
    if (reqUrl.pathname === '/signin' || reqUrl.pathname === '/signup' || reqUrl.pathname === '/') {
      return;
    } else {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  if (reqUrl.pathname === '/signin' || reqUrl.pathname === '/signup') {
    if (session?.user) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
});

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
};
