'use client';

import { Label } from '@/app/ui/label';
import { Input } from '@/app/ui/input';
import { useFormState } from 'react-dom';
import { createVendor } from '@/app/vendors/actions';

const initialState = {
  message: '',
};

function StatusMessage({ message }: { message: string }) {
  return (
    <div className="rounded-md bg-red-50 p-3">
      <p className="text-sm font-medium text-red-600">{message}</p>
    </div>
  );
}

export default function AddVendorForm() {
  const [state, formAction] = useFormState(createVendor, initialState);

  return (
    <form id="location-form" action={formAction}>
      <div className="space-y-4">
        {state?.message && <StatusMessage message={state.message} />}
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
      </div>
    </form>
  );
}
