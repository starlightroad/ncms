'use client';

import Link from 'next/link';
import Logo from '@/app/ui/logo';

export default function Navbar() {
  const appName = 'ncms';
  const companyName = 'Acme Networks';

  return (
    <header className="flex h-14 items-center border-b">
      <nav className="px-5">
        <ul className="flex items-center space-x-3">
          <li>
            <Link href="/">
              <Logo />
            </Link>
          </li>
          <li>
            <span className="text-sm">{appName}</span>
          </li>
          <li>
            <span className="text-sm text-gray-600">/</span>
          </li>
          <li>
            <span className="text-sm text-gray-600">{companyName}</span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
