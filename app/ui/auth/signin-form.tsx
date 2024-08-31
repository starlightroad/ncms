'use client';

import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';
import FormStatusMessage from '@/app/ui/form-status-message';
import { signInUser } from '@/app/(auth)/actions';

const initialState = {
  message: '',
};

export default function SignInForm() {
  const [state, formAction] = useFormState(signInUser, initialState);

  return (
    <form action={formAction}>
      <div className="flex flex-col">
        {state?.message && <FormStatusMessage message={state.message} />}
        <fieldset className="mb-3">
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input id="email" type="email" name="email" placeholder="Email" />
        </fieldset>
        <fieldset className="mb-3">
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <Input id="password" type="password" name="password" placeholder="Password" />
        </fieldset>
        <fieldset>
          <Label htmlFor="confirm-password" className="sr-only">
            Confirm Password
          </Label>
          <Input
            id="confirm-password"
            type="hidden"
            name="confirm-password"
            placeholder="Confirm Password"
            value=""
          />
        </fieldset>
        <Button size="sm" className="w-full">
          Sign In
        </Button>
      </div>
    </form>
  );
}
