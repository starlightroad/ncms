'use server';

import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { LocationSchema } from '@/app/lib/types';
import { getStates } from '@/app/data/state';
import { getCurrentUser } from '@/app/data/user';

export const createLocation = async (_: any, formData: FormData) => {
  const validatedFields = LocationSchema.safeParse({
    name: formData.get('name'),
    street: formData.get('street'),
    city: formData.get('city'),
    state: formData.get('state'),
    zip: formData.get('zip'),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;

    return {
      message: Object.values(errors)[0],
    };
  }

  const { name, street, city, state, zip } = validatedFields.data;

  try {
    const states = await getStates();
    const isValidState = states.find(
      ({ abbreviation }) => abbreviation.toLowerCase() === state.toLowerCase(),
    );

    if (!isValidState) {
      return {
        message: 'Invalid State.',
      };
    }

    const locationExists = await prisma.location.findFirst({ where: { name: String(name) } });

    if (locationExists) {
      return {
        message: 'Location Already Exists.',
      };
    }

    const currentUser = await getCurrentUser();

    const locationRecords = await prisma.location.count({
      where: { companyId: currentUser?.company?.id },
    });

    if (locationRecords >= 10) {
      return {
        message: 'You are only allowed to create up to 10 locations.',
      };
    }

    await prisma.location.create({
      data: {
        name,
        street,
        city,
        state,
        zip,
        companyId: String(currentUser?.company?.id),
      },
    });
  } catch (error) {
    return {
      message: 'Failed to Create Location.',
    };
  }

  revalidatePath('/dashboard/locations');
  redirect('/dashboard/locations');
};

export const updateLocation = async (id: string, _: any, formData: FormData) => {
  const validatedFields = LocationSchema.safeParse({
    name: formData.get('name'),
    street: formData.get('street'),
    city: formData.get('city'),
    state: formData.get('state'),
    zip: formData.get('zip'),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;

    return {
      message: Object.values(errors)[0],
    };
  }

  const { name, street, city, state, zip } = validatedFields.data;

  try {
    const locationExists = await prisma.location.findFirst({ where: { name: String(name) } });

    if (locationExists && locationExists.id !== id) {
      return {
        message: 'Location Already Exists.',
      };
    }

    const currentUser = await getCurrentUser();

    await prisma.location.update({
      where: {
        id,
      },
      data: {
        name,
        street,
        city,
        state,
        zip,
        companyId: currentUser?.company?.id,
      },
    });
  } catch (error) {
    return {
      message: 'Failed to Edit Location.',
    };
  }

  revalidatePath('/dashboard/locations');
  redirect(`/dashboard/locations/${id}`);
};

export const deleteLocation = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();
    await prisma.location.delete({ where: { companyId: currentUser?.company?.id, id } });
  } catch (error) {
    return {
      message: 'Failed to Delete Location.',
    };
  }

  revalidatePath('/dashboard/locations');
  redirect('/dashboard/locations');
};
