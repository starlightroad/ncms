'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import FormStatusMessage from '@/app/ui/form-status-message';
import { deleteCircuit } from '@/app/circuits/actions';
import { Button } from '@/app/ui/button';
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

const initialState = {
  message: '',
};

type Props = {
  circuitId: string;
  trigger: React.ReactNode;
};

export default function DeleteCircuitModal({ circuitId, trigger }: Props) {
  const deleteCircuitWithId = deleteCircuit.bind(null, circuitId);
  const [state, formAction] = useFormState(deleteCircuitWithId, initialState);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Circuit</DialogTitle>
          <DialogDescription>Are you sure you want to delete this circuit?</DialogDescription>
        </DialogHeader>
        {state.message && <FormStatusMessage message={state.message} />}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <form action={formAction}>
            <FormButton />
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" disabled={pending}>
      Yes
    </Button>
  );
}
