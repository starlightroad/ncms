import { z } from 'zod';
import { Vendor } from '@prisma/client';
import { US_PHONE_NUMBER_REGEX } from '@/app/lib/constants';

export type Address = {
  street: string;
  city: string;
  state: string;
  zip: number;
};

export type Circuit = {
  id: number;
  name: string;
  capacity: string;
  type: string;
  location: {
    a: Address;
    z: Address;
  };
};

export type Location = Address & { id: number; name: string };

export { type Vendor };

export const VendorSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is Required.' }),
  website: z.string().trim().url({ message: 'Invalid URL.' }),
  phone: z.string().trim().regex(US_PHONE_NUMBER_REGEX, { message: 'Invalid Phone Number.' }),
});
