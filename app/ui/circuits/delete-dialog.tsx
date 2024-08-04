'use client';

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
import { Trash2Icon } from 'lucide-react';
import { Button } from '@/app/ui/button';
import { deleteCircuit } from '@/app/data/circuit';

export default function DeleteDialog({ circuitId }: { circuitId: number }) {
  const deleteCircuitWithId = deleteCircuit.bind(null, circuitId);

  return (
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
          <form action={deleteCircuitWithId}>
            <Button type="submit" size="sm">
              Yes
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
