'use server';

import { signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { SignInSchema } from '@/app/lib/types';
import { createNewUser, getUserByEmail } from '@/app/data/user';
import { saltAndHashPassword } from '@/app/lib/bcrypt';

const validateFormData = (formData: FormData) => {
  return SignInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
};

export const signInUser = async (_: any, formData: FormData) => {
  const isHoneypot = formData.get('confirm-password') !== '';

  if (isHoneypot) return;

  const validatedFields = validateFormData(formData);

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;

    return {
      message: errors.email ? String(errors.email) : String(errors.password),
    };
  }

  const validatedData = {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  try {
    await signIn('credentials', { ...validatedData, redirect: false });
  } catch (error) {
    let message = null;
    const genericMessage = 'Failed to Sign In User.';

    if (error instanceof Error) {
      if (error.message.includes("Can't reach database")) message = genericMessage;
      else if (error.name === 'CallbackRouteError') message = genericMessage;
      else if (error.name === 'CredentialsSignin') message = genericMessage;
    }

    return {
      message: message ?? 'Something Went Wrong.',
    };
  }

  redirect('/dashboard');
};

export const signUpUser = async (_: any, formData: FormData) => {
  const validatedFields = validateFormData(formData);

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;

    return {
      message: errors.email ? String(errors.email) : String(errors.password),
    };
  }

  const validatedData = {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  try {
    const user = await getUserByEmail(validatedData.email);
    const userExists = !!user;

    if (userExists) {
      return {
        message: 'User Already Exists.',
      };
    }

    const passwordHash = await saltAndHashPassword(validatedData.password);

    await createNewUser(validatedData.email, passwordHash);

    return {
      message:
        'Your account does not belong to a company yet. Please contact your administrator for assistance.',
    };
  } catch (error) {
    let message = null;
    const genericMessage = 'Failed to Sign Up User.';

    if (error instanceof Error) {
      if (error.message.includes("Can't reach database")) message = genericMessage;
      else if (error.name === 'CallbackRouteError') message = genericMessage;
      else if (error.name === 'CredentialsSignin') message = genericMessage;
    }

    return {
      message: message ?? 'Something Went Wrong.',
    };
  }
};

export const signOutUser = async (_: any, formData: FormData) => {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    return {
      message: 'Failed to Sign Out User.',
    };
  }

  redirect('/signin');
};
