'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import { EllipsisIcon } from 'lucide-react';
import type { Circuit } from '@/app/lib/types';
import { Button } from '@/app/ui/button';
import DeleteCircuitModal from '@/app/ui/circuits/delete-modal';
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

export default function TableActionsList({ circuit }: { circuit: Circuit }) {
  const DeleteCircuitElement = forwardRef(function () {
    return <DeleteCircuitModal circuitId={circuit.id} trigger={DeleteButton} />;
  });
  DeleteCircuitElement.displayName = 'DeleteCircuitElement';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisIcon size={16} className="m-0.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/circuits/${circuit.id}`}>View</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/circuits/${circuit.id}/edit`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <DeleteCircuitElement />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
