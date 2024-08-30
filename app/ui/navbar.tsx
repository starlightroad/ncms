import Link from 'next/link';
import { Suspense } from 'react';
import Logo from '@/app/ui/logo';
import NavbarMenu, { MobileNavbarMenu } from '@/app/ui/navbar-menu';
import Search from '@/app/ui/search';
import { getCurrentUser } from '@/app/data/user';

export default async function Navbar() {
  const currentUser = await getCurrentUser();
  const appName = 'ncms';
  const companyName = currentUser?.company?.name;
  const dashboardLink = '/dashboard';

  return (
    <header className="fixed z-10 flex h-14 w-full items-center justify-between border-b bg-background">
      <nav className="px-5">
        <ul className="flex items-center space-x-3">
          <li className="flex items-center justify-center md:hidden">
            <MobileNavbarMenu />
          </li>
          <li>
            <Link href={dashboardLink}>
              <Logo />
            </Link>
          </li>
          <li className="hidden md:list-item">
            <span className="text-sm text-foreground">{appName}</span>
          </li>
          <li className="hidden md:list-item">
            <span className="text-sm text-foreground/30">/</span>
          </li>
          <li className="hidden md:list-item">
            <span className="text-sm text-foreground/65">{companyName}</span>
          </li>
        </ul>
      </nav>

      <div className="mr-3 flex h-full grow items-center justify-end gap-3 md:mr-0">
        <Suspense fallback={<div>LOADING...</div>}>
          <Search placeholder="Search" />
        </Suspense>
        <div className="hidden h-full items-center border-l px-5 md:flex">
          <NavbarMenu
            name={currentUser?.name?.toString()}
            email={currentUser?.email}
            image={currentUser?.image?.toString()}
          />
        </div>
      </div>
    </header>
  );
}
