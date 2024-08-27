'use client';

import { forwardRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { signOutUser } from '@/app/(auth)/actions';
import { Button } from '@/app/ui/button';

const initialState = {
  message: '',
};

export const SignOutForm = forwardRef(() => {
  const [_, formAction] = useFormState(signOutUser, initialState);

  return (
    <form action={formAction}>
      <SignOutButton />
    </form>
  );
});

function SignOutButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="ghost"
      className="h-8 w-full justify-start rounded-sm px-2"
      disabled={pending}
    >
      Sign Out
    </Button>
  );
}

SignOutForm.displayName = 'SignOutForm';
