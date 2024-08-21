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
