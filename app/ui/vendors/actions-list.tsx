'use client';

import Link from 'next/link';
import { EyeIcon } from 'lucide-react';
import type { Vendor } from '@/app/lib/types';
import EditVendorDialog from '@/app/ui//vendors/edit-dialog';
import DeleteVendorDialog from '@/app/ui/vendors/delete-dialog';

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
        <EditVendorDialog vendor={vendor} />
      </li>
      <li>
        <DeleteVendorDialog vendorId={vendor.id} />
      </li>
    </ul>
  );
}
