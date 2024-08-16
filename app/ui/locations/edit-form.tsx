'use client';

import { useFormState, useFormStatus } from 'react-dom';
import type { Location } from '@/app/lib/types';
import { updateLocation } from '@/app/locations/actions';
import FormStatusMessage from '@/app/ui/form-status-message';
import { Label } from '@/app/ui/label';
import { Input } from '@/app/ui/input';
import { Button } from '@/app/ui/button';
import Link from 'next/link';

const initialState = {
  message: '',
};

export default function EditLocationForm({ data }: { data: Location }) {
  const updateLocationWithId = updateLocation.bind(null, data.id);
  const [state, formAction] = useFormState(updateLocationWithId, initialState);

  return (
    <form id="location-form" action={formAction}>
      <div className="space-y-4">
        {state?.message && <FormStatusMessage message={String(state.message)} />}
        <fieldset className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Acme Palace"
            className="h-9"
            defaultValue={data.name}
          />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="street">Street</Label>
          <Input
            type="text"
            id="street"
            name="street"
            placeholder="123 Main St"
            className="h-9"
            defaultValue={data.street}
          />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            type="text"
            id="city"
            name="city"
            placeholder="Miami"
            className="h-9"
            defaultValue={data.city}
          />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            type="text"
            id="state"
            name="state"
            placeholder="FL"
            className="h-9"
            defaultValue={data.state}
          />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="zip">ZIP Code</Label>
          <Input
            type="text"
            id="zip"
            name="zip"
            placeholder="33111"
            className="h-9"
            defaultValue={data.zip}
          />
        </fieldset>
        <div className="flex justify-end space-x-3">
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/locations/${data.id}`}>Cancel</Link>
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
    <Button type="submit" size="sm" form="location-form" disabled={pending}>
      Update
    </Button>
  );
}
