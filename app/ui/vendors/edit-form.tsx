'use client';

import { useFormState } from 'react-dom';
import type { DialogState, Vendor } from '@/app/lib/types';
import { Label } from '@/app/ui/label';
import { Input } from '@/app/ui/input';
import { updateVendor } from '@/app/vendors/actions';

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

type Props = {
  vendor: Vendor;
  dialogState: DialogState;
};

export default function EditVendorForm({ vendor, dialogState }: Props) {
  const updateVendorWithId = updateVendor.bind(null, vendor.id);
  const [state, formAction] = useFormState(updateVendorWithId, initialState);

  if (dialogState.isOpen && state?.message === undefined) {
    dialogState.setIsOpen(false);
  }

  return (
    <form id="vendor-form" action={formAction}>
      <div className="space-y-4">
        {state?.message && <StatusMessage message={String(state.message)} />}
        <fieldset className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Acme Fiber"
            className="h-9"
            defaultValue={vendor.name}
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
            defaultValue={vendor.website}
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
            defaultValue={vendor.phone}
          />
        </fieldset>
      </div>
    </form>
  );
}
