'use client';

import Link from 'next/link';
import { EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import type { Vendor } from '@/app/lib/types';
import DeleteVendorModal from '@/app/ui/vendors/delete-modal';
import { Button } from '@/app/ui/button';

const DeleteButton = (
  <Button variant="ghost" className="h-7 px-1 text-gray-600 hover:bg-red-100 hover:text-red-600">
    <Trash2Icon className="h-5 w-5" />
  </Button>
);

export default function TableActionsList({ vendor }: { vendor: Vendor }) {
  return (
    <ul className="flex space-x-3">
      <li>
        <Link
          href={`/vendors/${vendor.id}`}
          className="block rounded-lg p-1 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <EyeIcon className="h-5 w-5" />
        </Link>
      </li>
      <li>
        <Button variant="ghost" className="h-7 px-1 text-gray-600" asChild>
          <Link href={`/vendors/${vendor.id}/edit`}>
            <PencilIcon className="h-5 w-5" />
          </Link>
        </Button>
      </li>
      <li>
        <DeleteVendorModal vendorId={vendor.id} trigger={DeleteButton} />
      </li>
    </ul>
  );
}
