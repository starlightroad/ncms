import Link from 'next/link';
import { EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import type { Circuit } from '@/app/lib/types';
import { Button } from '@/app/ui/button';
import DeleteCircuitModal from '@/app/ui/circuits/delete-modal';

const DeleteButton = (
  <Button variant="ghost" className="h-7 px-1 text-gray-600 hover:bg-red-100 hover:text-red-600">
    <Trash2Icon className="h-5 w-5" />
  </Button>
);

export default function TableActionsList({ circuit }: { circuit: Circuit }) {
  return (
    <ul className="flex space-x-3">
      <li>
        <Link
          href={`/circuits/${circuit.id}`}
          className="block rounded-lg p-1 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <EyeIcon className="h-5 w-5" />
        </Link>
      </li>
      <li>
        <Button variant="ghost" className="h-7 px-1 text-gray-600" asChild>
          <Link href={`/circuits/${circuit.id}/edit`}>
            <PencilIcon className="h-5 w-5" />
          </Link>
        </Button>
      </li>
      <li>
        <DeleteCircuitModal circuitId={circuit.id} trigger={DeleteButton} />
      </li>
    </ul>
  );
}
