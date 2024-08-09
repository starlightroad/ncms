'use client';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/app/ui/dropdown-menu';
import { Button } from '@/app/ui/button';

export default function MapFilters() {
  return (
    <div className="absolute left-[10px] top-[10px] z-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Filters
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="" align="start">
          <DropdownMenuCheckboxItem checked={true} onCheckedChange={() => {}}>
            Circuits
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={true} onCheckedChange={() => {}}>
            Vendors
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
