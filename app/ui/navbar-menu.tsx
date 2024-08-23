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

function NavbarUser() {
  return (
    <div className="flex items-center space-x-3">
      <Avatar>
        <AvatarImage src="/robot.png" />
        <AvatarFallback>DU</AvatarFallback>
      </Avatar>
      <p className="text-sm">Demo User</p>
    </div>
  );
}

export default function NavbarMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <NavbarUser />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sign Out</DropdownMenuItem>
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
          <Link href="/">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/circuits">Circuits</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/locations">Locations</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/vendors">Vendors</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
