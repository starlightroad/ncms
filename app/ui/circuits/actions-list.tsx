import Link from 'next/link';
import { EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import type { Circuit } from '@/app/lib/types';
import { Button } from '@/app/ui/button';
import EditCircuitForm from '@/app/ui/circuits/edit-form';
import DeleteCircuitForm from '@/app/ui/circuits/delete-form';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/ui/dialog';

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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-7 px-1 text-gray-600">
              <PencilIcon className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Circuit</DialogTitle>
            </DialogHeader>
            <EditCircuitForm circuit={circuit} />
            <DialogFooter>
              <Button type="submit" form="edit-form">
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </li>
      <li>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="h-7 px-1 text-gray-600 hover:bg-red-100 hover:text-red-600"
            >
              <Trash2Icon className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Circuit</DialogTitle>
              <DialogDescription>Are you sure you want to delete this circuit?</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" size="sm">
                  Cancel
                </Button>
              </DialogClose>
              <DeleteCircuitForm circuitId={circuit.id} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </li>
    </ul>
  );
}
