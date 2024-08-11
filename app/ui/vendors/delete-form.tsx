'use client';

import { useFormState } from 'react-dom';
import { type Dispatch, type SetStateAction, useEffect } from 'react';
import type { DialogState } from '@/app/lib/types';
import { Button } from '@/app/ui/button';
import { deleteVendor } from '@/app/vendors/actions';

const initialState = {
  message: '',
};

type Props = {
  vendorId: string;
  dialogState: DialogState;
  setFormMessage: Dispatch<SetStateAction<string>>;
};

export default function DeleteVendorForm({ vendorId, dialogState, setFormMessage }: Props) {
  const deleteVendorWithId = deleteVendor.bind(null, vendorId);
  const [state, formAction] = useFormState(deleteVendorWithId, initialState);

  useEffect(() => {
    if (dialogState.isOpen && !state) {
      dialogState.setIsOpen(false);
    }

    if (state?.message) {
      setFormMessage(state.message);
    }
  });

  return (
    <form id="vendor-form" action={formAction}>
      <Button type="submit" form="vendor-form" size="sm">
        Yes
      </Button>
    </form>
  );
}
