'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import FormStatusMessage from '@/app/ui/form-status-message';
import { deleteLocation } from '@/app/locations/actions';
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

export default function DeleteLocationModal({
  locationId,
  trigger,
}: {
  locationId: string;
  trigger: React.ReactNode;
}) {
  const deleteLocationWithId = deleteLocation.bind(null, locationId);
  const [state, formAction] = useFormState(deleteLocationWithId, initialState);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Location</DialogTitle>
          <DialogDescription>Are you sure you want to delete this location?</DialogDescription>
        </DialogHeader>
        {state.message && <FormStatusMessage message={state.message} />}
        <DialogFooter className="gap-3 sm:gap-0">
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
    <Button type="submit" size="sm" disabled={pending} className="w-full lg:w-auto">
      Yes
    </Button>
  );
}
