'use client';

import { type Dispatch, type SetStateAction, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import type { DialogState } from '@/app/lib/types';
import { Button } from '@/app/ui/button';
import { deleteLocation } from '@/app/locations/actions';

const initialState = {
  message: '',
};

type FormState = {
  message?: string;
  setFormMessage: Dispatch<SetStateAction<string>>;
};

type Props = {
  locationId: string;
  dialogState: DialogState;
  formState: Omit<FormState, 'message'>;
};

export default function DeleteLocationForm({ locationId, dialogState, formState }: Props) {
  const deleteLocationWithId = deleteLocation.bind(null, locationId);
  const [state, formAction] = useFormState(deleteLocationWithId, initialState);

  return (
    <form id="location-form" action={formAction}>
      <FormButton
        dialogState={dialogState}
        formState={{ message: state.message, setFormMessage: formState.setFormMessage }}
      />
    </form>
  );
}

type FormButtonProps = {
  dialogState: DialogState;
  formState: FormState;
};

function FormButton({ dialogState, formState }: FormButtonProps) {
  const { pending } = useFormStatus();

  useEffect(() => {
    if (formState.message === undefined) {
      dialogState.setIsOpen(false);
    }
  });

  return (
    <Button type="submit" form="location-form" size="sm" disabled={pending}>
      Yes
    </Button>
  );
}
