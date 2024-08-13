'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import type { DialogState } from '@/app/lib/types';
import { Label } from '@/app/ui/label';
import { Input } from '@/app/ui/input';
import { createVendor } from '@/app/vendors/actions';
import FormStatusMessage from '@/app/ui/form-status-message';
import { DialogFooter } from '@/app/ui/dialog';
import { Button } from '@/app/ui/button';

const initialState = {
  message: '',
};

export default function AddVendorForm({ dialogState }: { dialogState: DialogState }) {
  const [state, formAction] = useFormState(createVendor, initialState);

  return (
    <form id="vendor-form" action={formAction}>
      <div className="space-y-4">
        {state?.message && <FormStatusMessage message={String(state.message)} />}
        <fieldset className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" placeholder="Acme Fiber" className="h-9" />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            type="text"
            id="website"
            name="website"
            placeholder="acmefiber.com"
            className="h-9"
          />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="phone">Support Line</Label>
          <Input type="text" id="phone" name="phone" placeholder="888-123-9876" className="h-9" />
        </fieldset>
        <FormButton formMessage={state?.message} dialogState={dialogState} />
      </div>
    </form>
  );
}

type FormButtonProps = {
  formMessage?: string | string[];
  dialogState: DialogState;
};

function FormButton({ formMessage, dialogState }: FormButtonProps) {
  const { pending } = useFormStatus();

  useEffect(() => {
    if (formMessage === undefined) {
      dialogState.setIsOpen(false);
    }
  });

  return (
    <DialogFooter>
      <Button type="submit" size="sm" form="vendor-form" disabled={pending}>
        Create
      </Button>
    </DialogFooter>
  );
}
