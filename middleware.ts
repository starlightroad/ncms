import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { NextResponse } from 'next/server';
import { PUBLIC_ROUTES } from '@/app/lib/constants';

const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (request) => {
  const requestUrl = request.nextUrl;
  const isAuthenticated = !!request.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(requestUrl.pathname);

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (isAuthenticated && isPublicRoute && requestUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
};
