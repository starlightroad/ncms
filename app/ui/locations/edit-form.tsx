'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import type { DialogState, Location } from '@/app/lib/types';
import { Label } from '@/app/ui/label';
import { Input } from '@/app/ui/input';
import { updateLocation } from '@/app/locations/actions';
import { DialogFooter } from '../dialog';
import { Button } from '../button';
import FormStatusMessage from '../form-status-message';

const initialState = {
  message: '',
};

type Props = {
  location: Location;
  dialogState: DialogState;
};

export default function EditLocationForm({ location, dialogState }: Props) {
  const updateLocationWithId = updateLocation.bind(null, location.id);
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
            defaultValue={location.name}
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
            defaultValue={location.street}
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
            defaultValue={location.city}
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
            defaultValue={location.state}
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
            defaultValue={location.zip}
          />
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
      <Button type="submit" size="sm" form="location-form" disabled={pending}>
        Update
      </Button>
    </DialogFooter>
  );
}
