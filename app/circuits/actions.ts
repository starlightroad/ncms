'use server';

import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CircuitSchema } from '@/app/lib/types';
import { getDemoCompanyId } from '@/app/data/demo';

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
    const circuitExists = await prisma.circuit.findFirst({ where: { cid: circuitId } });

    if (circuitExists) {
      return {
        message: 'Circuit Already Exists.',
      };
    }

    const demoCompanyId = await getDemoCompanyId();

    await prisma.circuit.create({
      data: {
        cid: circuitId,
        vendorId,
        type,
        capacity,
        location1Id,
        location2Id,
        companyId: String(demoCompanyId),
      },
    });
  } catch (error) {
    return {
      message: 'Failed to Create Circuit.',
    };
  }

  revalidatePath('/circuits');
  redirect('/circuits');
};
