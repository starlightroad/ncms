'use server';

import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import { getDemoCompanyId } from '@/app/data/demo';

export const createVendor = async (_: any, formData: FormData) => {
  const rawUserData = {
    name: formData.get('name'),
    website: formData.get('website'),
    phone: formData.get('phone'),
  };
  const { name, website, phone } = rawUserData;

  if (!name || !website || !phone) {
    return {
      message: 'Fields must not be blank.',
    };
  }

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
        name: String(name),
        website: String(website),
        phone: String(phone),
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
