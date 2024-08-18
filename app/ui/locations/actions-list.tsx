'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import { EllipsisIcon } from 'lucide-react';
import type { Location } from '@/app/lib/types';
import { Button } from '@/app/ui/button';
import DeleteLocationModal from '@/app/ui/locations/delete-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/ui/dropdown-menu';

const DeleteButton = (
  <Button
    variant="ghost"
    className="h-8 w-full cursor-default justify-start px-2 py-1.5 font-normal"
  >
    Delete
  </Button>
);

export default function TableActionsList({ location }: { location: Location }) {
  const DeleteLocationElement = forwardRef(function () {
    return <DeleteLocationModal locationId={location.id} trigger={DeleteButton} />;
  });
  DeleteLocationElement.displayName = 'DeleteLocationElement';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisIcon size={16} className="m-0.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/locations/${location.id}`}>View</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/locations/${location.id}/edit`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <DeleteLocationElement />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
