'use client';

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import type { Vendor } from '@/app/lib/types';
import { Label } from '@/app/ui/label';
import { Input } from '@/app/ui/input';
import { updateVendor } from '@/app/dashboard/vendors/actions';
import FormStatusMessage from '@/app/ui/form-status-message';
import { Button } from '@/app/ui/button';

const initialState = {
  message: '',
};

export default function EditVendorForm({ data }: { data: Vendor }) {
  const updateVendorWithId = updateVendor.bind(null, data.id);
  const [state, formAction] = useFormState(updateVendorWithId, initialState);

  return (
    <form action={formAction}>
      <div className="space-y-4">
        {state?.message && <FormStatusMessage message={String(state.message)} />}
        <fieldset className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Acme Fiber"
            className="h-9"
            defaultValue={data.name}
          />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            type="text"
            id="website"
            name="website"
            placeholder="acmefiber.com"
            className="h-9"
            defaultValue={data.website}
          />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="phone">Support Line</Label>
          <Input
            type="text"
            id="phone"
            name="phone"
            placeholder="8881239876"
            className="h-9"
            defaultValue={data.phone}
          />
        </fieldset>
        <div className="flex justify-end space-x-3">
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/dashboard/vendors/${data.id}`}>Cancel</Link>
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
      Update
    </Button>
  );
}
