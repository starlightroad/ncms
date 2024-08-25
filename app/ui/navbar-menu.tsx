import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/ui/avatar';
import type { Avatar as AvatarType } from '@/app/lib/types';
import { SignOutForm } from '@/app/ui/auth/signout-form';

function NavbarUser({ name, email, image }: AvatarType) {
  const avatarFallbackName = name?.slice(0, 2) ?? email?.slice(0, 2);

  return (
    <div className="flex items-center space-x-3">
      <Avatar>
        <AvatarImage src={image} />
        <AvatarFallback className="uppercase">{avatarFallbackName}</AvatarFallback>
      </Avatar>
      <p className="max-w-44 truncate text-sm">{email}</p>
    </div>
  );
}

export default function NavbarMenu({ name, email, image }: AvatarType) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <NavbarUser name={name} email={email} image={image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <SignOutForm />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MobileNavbarMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/circuits">Circuits</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/locations">Locations</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/vendors">Vendors</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <SignOutForm />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
