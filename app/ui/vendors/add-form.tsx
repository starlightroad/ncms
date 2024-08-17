'use client';

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { Label } from '@/app/ui/label';
import { Input } from '@/app/ui/input';
import { createVendor } from '@/app/vendors/actions';
import FormStatusMessage from '@/app/ui/form-status-message';
import { Button } from '@/app/ui/button';

const initialState = {
  message: '',
};

export default function AddVendorForm() {
  const [state, formAction] = useFormState(createVendor, initialState);

  return (
    <form action={formAction}>
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
        <div className="flex justify-end space-x-3">
          <Button type="button" size="sm" variant="secondary" asChild>
            <Link href="/vendors">Cancel</Link>
          </Button>
          <FormButton />
        </div>
      </div>
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" disabled={pending}>
      Create
    </Button>
  );
}
