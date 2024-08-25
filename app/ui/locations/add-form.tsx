'use client';

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { Label } from '@/app/ui/label';
import { Input } from '@/app/ui/input';
import { Button } from '@/app/ui/button';
import FormStatusMessage from '@/app/ui/form-status-message';
import { createLocation } from '@/app/dashboard/locations/actions';
import type { State } from '@/app/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/ui/select';

const initialState = {
  message: '',
};

export default function AddLocationForm({ data }: { data: { states: State[] } }) {
  const [state, formAction] = useFormState(createLocation, initialState);

  return (
    <form action={formAction}>
      <div className="space-y-4">
        {state?.message && <FormStatusMessage message={String(state.message)} />}
        <fieldset className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" placeholder="Acme Palace" className="h-9" />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="street">Street</Label>
          <Input type="text" id="street" name="street" placeholder="123 Main St" className="h-9" />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input type="text" id="city" name="city" placeholder="Miami" className="h-9" />
        </fieldset>
        <fieldset className="space-y-2" disabled={!data.states.length}>
          <Label htmlFor="state">State</Label>
          <Select name="state">
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {data.states.map((state) => {
                const key = `state-${state.abbreviation}`;
                const itemName = `${state.abbreviation} - ${state.name}`;

                return (
                  <SelectItem key={key} id={key} value={state.abbreviation}>
                    {itemName}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="zip">ZIP Code</Label>
          <Input type="text" id="zip" name="zip" placeholder="33111" className="h-9" />
        </fieldset>
        <div>
          <div className="flex justify-end space-x-3">
            <Button type="button" size="sm" variant="secondary" asChild>
              <Link href="/dashboard/locations">Cancel</Link>
            </Button>
            <FormButton />
          </div>
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
