'use client';

import { type FormEvent, useState } from 'react';
import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';
import FormStatusMessage from '@/app/ui/form-status-message';
import { signInUser } from '@/app/(auth)/actions';
import { users } from '@/app/data/placeholder-data';

const initialState = {
  message: '',
};

type UserCredential = Pick<(typeof users)[0], 'email' | 'password'>;

const getDemoUserCredentials = () => {
  const [demoUser] = users;
  const { email, password } = demoUser;

  return {
    email,
    password,
  };
};

export default function SignInForm() {
  const [state, formAction] = useFormState(signInUser, initialState);

  const [demoCredentials, setDemoCredentials] = useState<UserCredential>();

  const fillDemoUserCredentials = (e: FormEvent) => {
    e.preventDefault();

    const demoUserCredentials = getDemoUserCredentials();

    setDemoCredentials(demoUserCredentials);
  };

  return (
    <form action={formAction}>
      <div className="flex flex-col">
        {state?.message && <FormStatusMessage message={state.message} />}
        <fieldset className="mb-3">
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={demoCredentials?.email}
          />
        </fieldset>
        <fieldset className="mb-3">
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            defaultValue={demoCredentials?.password}
          />
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
        <Button variant="link" size="sm" onClick={fillDemoUserCredentials}>
          Use Demo Account
        </Button>
      </div>
    </form>
  );
}
