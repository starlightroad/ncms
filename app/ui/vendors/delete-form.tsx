'use client';

import { useFormState, useFormStatus } from 'react-dom';
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
  formState: {
    setFormMessage: Dispatch<SetStateAction<string>>;
  };
};

export default function DeleteVendorForm({ vendorId, dialogState, formState }: Props) {
  const deleteVendorWithId = deleteVendor.bind(null, vendorId);
  const [state, formAction] = useFormState(deleteVendorWithId, initialState);

  return (
    <form id="vendor-form" action={formAction}>
      <FormButton
        dialogState={dialogState}
        formState={{ message: state?.message, setFormMessage: formState.setFormMessage }}
      />
    </form>
  );
}

type FormButtonProps = {
  dialogState: DialogState;
  formState: {
    message?: string;
    setFormMessage: Dispatch<SetStateAction<string>>;
  };
};

function FormButton({ dialogState, formState }: FormButtonProps) {
  const { pending } = useFormStatus();

  useEffect(() => {
    if (formState.message === undefined) {
      dialogState.setIsOpen(false);
    }
  });

  return (
    <Button type="submit" form="vendor-form" size="sm" disabled={pending}>
      Yes
    </Button>
  );
}
