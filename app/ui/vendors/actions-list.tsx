'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import { EllipsisIcon } from 'lucide-react';
import type { Vendor } from '@/app/lib/types';
import { Button } from '@/app/ui/button';
import DeleteVendorModal from '@/app/ui/vendors/delete-modal';
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

export default function TableActionsList({ vendor }: { vendor: Vendor }) {
  const DeleteVendorElement = forwardRef(function () {
    return <DeleteVendorModal vendorId={vendor.id} trigger={DeleteButton} />;
  });
  DeleteVendorElement.displayName = 'DeleteVendorElement';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisIcon size={16} className="m-0.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/vendors/${vendor.id}`}>View</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/vendors/${vendor.id}/edit`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <DeleteVendorElement />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
