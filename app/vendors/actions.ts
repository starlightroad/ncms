'use server';

import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import { getDemoCompanyId } from '@/app/data/demo';
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
    const vendorExists = await prisma.vendor.findFirst({ where: { name: String(name) } });

    if (vendorExists) {
      return {
        message: 'Vendor Already Exists.',
      };
    }

    const demoCompanyId = await getDemoCompanyId();

    await prisma.vendor.create({
      data: {
        name,
        website,
        phone: phone.replaceAll('-', ''),
        companyId: String(demoCompanyId),
      },
    });
  } catch (error) {
    return {
      message: 'Failed to Create Vendor.',
    };
  }

  revalidatePath('/vendors');
};
