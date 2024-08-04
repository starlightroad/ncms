import Link from 'next/link';
import { EyeIcon } from 'lucide-react';
import EditDialog from '@/app/ui/circuits/edit-dialog';
import DeleteDialog from '@/app/ui/circuits/delete-dialog';
import { getCircuit } from '@/app/data/circuit';

export default function ActionsList({ circuitId }: { circuitId: number }) {
  const data = getCircuit(circuitId);

  return (
    <ul className="flex space-x-3">
      <li>
        <Link
          href={`/circuits/${data?.id}`}
          className="block rounded-lg p-1 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <EyeIcon className="h-5 w-5" />
        </Link>
      </li>
      <li>
        <EditDialog data={data} />
      </li>
      <li>
        <DeleteDialog circuitId={data?.id!} />
      </li>
    </ul>
  );
}
