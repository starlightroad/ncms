'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    id: '26c211a8-ab0e-4c54-accd-1de3da2ab2d8',
    label: 'Dashboard',
    href: '/',
  },
  {
    id: '65288da9-356f-4f31-82c7-6056f8e9c954',
    label: 'Circuits',
    href: '/circuits',
  },
  {
    id: '4458cf3a-dac1-4217-a88c-7aec4a3dc04b',
    label: 'Locations',
    href: '/locations',
  },
  {
    id: '3f1e2b91-7f0a-43e7-a66f-9102da5d6e20',
    label: 'Vendors',
    href: '/vendors',
  },
  {
    id: '35a4e565-6f8c-4cf8-9ba6-008d44d29c1f',
    label: 'Map',
    href: '/map',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full w-full max-w-56 border-r">
      <nav className="py-6">
        <ul className="space-y-1 px-3">
          {navItems.map((navItem) => {
            const href = `/${pathname.split('/').slice(1)[0]}` || '/';
            const activeLink = href === navItem.href;

            return (
              <li key={navItem.id}>
                <Link
                  href={navItem.href}
                  className={`relative flex w-full rounded-md py-3 hover:text-pink-600 ${activeLink ? 'bg-pink-600 bg-opacity-[6%] font-medium' : 'text-gray-600'}`}
                >
                  <span
                    className={`absolute top-2 h-[calc(100%-16px)] rounded-b-sm rounded-t-sm border-x-2 ${activeLink ? 'border-pink-600' : 'border-transparent'}`}
                  ></span>
                  <p className={`pl-4 text-sm ${activeLink ? 'text-pink-600' : ''}`}>
                    {navItem.label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
