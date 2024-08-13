'use client';

import Link from 'next/link';
import { EyeIcon } from 'lucide-react';
import type { Location } from '@/app/lib/types';
import EditLocationDialog from '@/app/ui/locations/edit-dialog';
import DeleteLocationDialog from '@/app/ui/locations/delete-dialog';

export default function TableActionsList({ location }: { location: Location }) {
  return (
    <ul className="flex space-x-3">
      <li>
        <Link
          href={`/locations/${location.id}`}
          className="block rounded-lg p-1 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <EyeIcon className="h-5 w-5" />
        </Link>
      </li>
      <li>
        <EditLocationDialog location={location} />
      </li>
      <li>
        <DeleteLocationDialog locationId={location.id} />
      </li>
    </ul>
  );
}
