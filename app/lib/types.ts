import { z } from 'zod';
import { Vendor, Location } from '@prisma/client';
import type { Dispatch, SetStateAction } from 'react';
import { US_PHONE_NUMBER_REGEX, US_STREET_REGEX, US_ZIP_CODE_REGEX } from '@/app/lib/constants';

export type { Vendor, Location };

export type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
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

export type DialogState = { setIsOpen: Dispatch<SetStateAction<boolean>> };

export const VendorSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is Required.' }),
  website: z.string().trim().url({ message: 'Invalid URL.' }),
  phone: z.string().trim().regex(US_PHONE_NUMBER_REGEX, { message: 'Invalid Phone Number.' }),
});

export const LocationSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is Required.' }),
  street: z.string().trim().regex(US_STREET_REGEX, { message: 'Invalid Street Address.' }),
  city: z.string().trim().min(1, { message: 'City is Required.' }),
  state: z.string().trim().min(2, { message: 'State is Required.' }),
  zip: z.string().trim().regex(US_ZIP_CODE_REGEX, { message: 'Invalid ZIP Code.' }),
});

export const CircuitSchema = z.object({
  circuitId: z.string().trim().min(1, { message: 'Circuit ID is Required.' }),
  vendorId: z.string().trim().min(1, { message: 'Vendor ID is Required.' }),
  type: z.string().trim().min(1, { message: 'Circuit Type is Required.' }),
  capacity: z.string().trim().min(1, { message: 'Capacity is Required.' }),
  location1Id: z.string().trim().min(1, { message: 'A Location is Required.' }),
  location2Id: z.string().trim().min(1, { message: 'Z Location is Required.' }),
});
