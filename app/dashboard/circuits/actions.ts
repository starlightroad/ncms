'use server';

import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CircuitSchema } from '@/app/lib/types';
import { getUserBySession } from '@/app/data/session';

export const createCircuit = async (_: any, formData: FormData) => {
  const validatedFields = CircuitSchema.safeParse({
    circuitId: formData.get('circuitId'),
    vendorId: formData.get('vendorId'),
    type: formData.get('type'),
    capacity: formData.get('capacity'),
    location1Id: formData.get('location1Id'),
    location2Id: formData.get('location2Id'),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;

    return {
      message: Object.values(errors)[0],
    };
  }

  if (validatedFields.data.location1Id === validatedFields.data.location2Id) {
    return {
      message: 'Locations Must Be Unique.',
    };
  }

  const { circuitId, vendorId, type, capacity, location1Id, location2Id } = validatedFields.data;

  try {
    const user = await getUserBySession();
    const circuitExists = await prisma.circuit.findFirst({
      where: { companyId: String(user.companyId), cid: circuitId },
    });

    if (circuitExists) {
      return {
        message: 'Circuit Already Exists.',
      };
    }

    await prisma.circuit.create({
      data: {
        cid: circuitId,
        vendorId,
        type,
        capacity,
        location1Id,
        location2Id,
        companyId: String(user.companyId),
      },
    });
  } catch (error) {
    return {
      message: 'Failed to Create Circuit.',
    };
  }

  revalidatePath('/dashboard/circuits');
  redirect('/dashboard/circuits');
};

export const updateCircuit = async (id: string, _: any, formData: FormData) => {
  const validatedFields = CircuitSchema.safeParse({
    circuitId: formData.get('circuitId'),
    vendorId: formData.get('vendorId'),
    type: formData.get('type'),
    capacity: formData.get('capacity'),
    location1Id: formData.get('location1Id'),
    location2Id: formData.get('location2Id'),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;

    return {
      message: Object.values(errors)[0],
    };
  }

  if (validatedFields.data.location1Id === validatedFields.data.location2Id) {
    return {
      message: 'Locations Must Be Unique.',
    };
  }

  const { circuitId, vendorId, type, capacity, location1Id, location2Id } = validatedFields.data;

  try {
    const user = await getUserBySession();
    const circuitExists = await prisma.circuit.findFirst({
      where: { companyId: String(user.companyId), cid: circuitId },
    });

    if (circuitExists && circuitExists.id !== id) {
      return {
        message: 'Circuit Already Exists.',
      };
    }

    await prisma.circuit.update({
      where: {
        id,
      },
      data: {
        cid: circuitId,
        vendorId,
        type,
        capacity,
        location1Id,
        location2Id,
        companyId: String(user.companyId),
      },
    });
  } catch (error) {
    return {
      message: 'Failed to Update Circuit.',
    };
  }

  revalidatePath('/dashboard/circuits');
  redirect(`/dashboard/circuits/${id}`);
};

export const deleteCircuit = async (id: string) => {
  try {
    const user = await getUserBySession();
    await prisma.circuit.delete({ where: { companyId: String(user.companyId), id } });
  } catch (error) {
    return {
      message: 'Failed to Delete Circuit.',
    };
  }

  revalidatePath('/dashboard/circuits');
  redirect('/dashboard/circuits');
};
