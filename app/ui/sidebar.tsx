'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ArrowDownUpIcon, Building2Icon, LayoutDashboardIcon, MapPinIcon } from 'lucide-react';

const navItems = [
  {
    id: '26c211a8-ab0e-4c54-accd-1de3da2ab2d8',
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboardIcon,
  },
  {
    id: '65288da9-356f-4f31-82c7-6056f8e9c954',
    label: 'Circuits',
    href: '/circuits',
    icon: ArrowDownUpIcon,
  },
  {
    id: '4458cf3a-dac1-4217-a88c-7aec4a3dc04b',
    label: 'Locations',
    href: '/locations',
    icon: MapPinIcon,
  },
  {
    id: '3f1e2b91-7f0a-43e7-a66f-9102da5d6e20',
    label: 'Vendors',
    href: '/vendors',
    icon: Building2Icon,
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
            const Icon = navItem.icon;

            return (
              <li key={navItem.id}>
                <Link
                  href={navItem.href}
                  className={clsx(
                    'flex w-full items-center rounded-full px-4 py-3 text-gray-600 transition-colors hover:text-blue-600',
                    { 'bg-blue-50 font-medium': activeLink, 'hover:bg-gray-50': !activeLink },
                  )}
                >
                  <Icon className={clsx('h-4 w-4', { 'text-blue-600': activeLink })} />
                  <p className={clsx('pl-2 text-sm', { 'text-blue-600': activeLink })}>
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
