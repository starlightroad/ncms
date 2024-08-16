'use client';

import Link from 'next/link';
import { EyeIcon, PencilIcon } from 'lucide-react';
import type { Location } from '@/app/lib/types';
import { Button } from '@/app/ui/button';
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
        <Button variant="ghost" className="h-7 px-1 text-gray-600" asChild>
          <Link href={`/locations/${location.id}/edit`}>
            <PencilIcon className="h-5 w-5" />
          </Link>
        </Button>
      </li>
      <li>
        <DeleteLocationDialog locationId={location.id} />
      </li>
    </ul>
  );
}
