'use client';

import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';
import FormStatusMessage from '@/app/ui/form-status-message';
import { signUpUser } from '@/app/(auth)/actions';

const initialState = {
  message: '',
};

export default function SignUpForm() {
  const [state, formAction] = useFormState(signUpUser, initialState);

  return (
    <form action={formAction}>
      <div className="flex flex-col space-y-3">
        {state?.message && <FormStatusMessage message={state.message} />}
        <fieldset>
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input id="email" type="email" name="email" placeholder="Email" />
        </fieldset>
        <fieldset>
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <Input id="password" type="password" name="password" placeholder="Password" />
        </fieldset>
        <Button size="sm" className="w-full">
          Sign Up
        </Button>
      </div>
    </form>
  );
}
