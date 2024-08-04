import Link from 'next/link';
import { EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react';

export default function ActionsList({ circuitId }: { circuitId: number }) {
  return (
    <ul className="flex space-x-3">
      <li>
        <Link
          href={`/circuits/${circuitId}`}
          className="block rounded-lg p-1 text-gray-600 hover:bg-gray-100"
        >
          <EyeIcon className="h-5 w-5" />
        </Link>
      </li>
      <li>
        <div className="cursor-pointer rounded-lg p-1 text-gray-600 hover:bg-gray-100">
          <PencilIcon className="h-5 w-5" />
        </div>
      </li>
      <li>
        <div className="cursor-pointer rounded-lg p-1 text-gray-600 hover:bg-red-100 hover:text-red-600">
          <Trash2Icon className="h-5 w-5" />
        </div>
      </li>
    </ul>
  );
}
