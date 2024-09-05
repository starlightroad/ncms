'use server';

import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/app/data/user';
import { VendorSchema } from '@/app/lib/types';

export const createVendor = async (_: any, formData: FormData) => {
  const validatedFields = VendorSchema.safeParse({
    name: formData.get('name'),
    website: formData.get('website'),
    phone: formData.get('phone'),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;

    return {
      message: Object.values(errors)[0],
    };
  }

  const { name, website, phone } = validatedFields.data;

  try {
    const currentUser = await getCurrentUser();

    const vendorRecords = await prisma.vendor.count({
      where: { companyId: currentUser?.company?.id },
    });

    if (vendorRecords >= 10) {
      return {
        message: 'You are only allowed to create up to 10 vendors.',
      };
    }

    const vendorExists = await prisma.vendor.findFirst({ where: { name: String(name) } });

    if (vendorExists) {
      return {
        message: 'Vendor Already Exists.',
      };
    }

    await prisma.vendor.create({
      data: {
        name,
        website,
        phone: phone.replaceAll('-', ''),
        companyId: String(currentUser?.company?.id),
      },
    });
  } catch (error) {
    return {
      message: 'Failed to Create Vendor.',
    };
  }

  revalidatePath('/dashboard/vendors');
  redirect('/dashboard/vendors');
};

export const updateVendor = async (id: string, _: any, formData: FormData) => {
  const validatedFields = VendorSchema.safeParse({
    name: formData.get('name'),
    website: formData.get('website'),
    phone: formData.get('phone'),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;

    return {
      message: Object.values(errors)[0],
    };
  }

  const { name, website, phone } = validatedFields.data;

  try {
    const currentUser = await getCurrentUser();
    const vendorExists = await prisma.vendor.findFirst({ where: { name: String(name) } });

    if (vendorExists && vendorExists.id !== id) {
      return {
        message: 'Vendor Already Exists.',
      };
    }

    await prisma.vendor.update({
      where: {
        id,
      },
      data: {
        name,
        website,
        phone: phone.replaceAll('-', ''),
        companyId: currentUser?.company?.id,
      },
    });
  } catch (error) {
    return {
      message: 'Failed to Edit Vendor.',
    };
  }

  revalidatePath('/dashboard/vendors');
  redirect('/dashboard/vendors');
};

export const deleteVendor = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();
    await prisma.vendor.delete({ where: { id, companyId: currentUser?.company?.id } });
  } catch (error) {
    return {
      message: 'Failed to Delete Vendor.',
    };
  }

  revalidatePath('/dashboard/vendors');
  redirect('/dashboard/vendors');
};
