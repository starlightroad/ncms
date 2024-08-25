import { z } from 'zod';
import { Vendor, Location, Circuit } from '@prisma/client';
import { US_PHONE_NUMBER_REGEX, US_STREET_REGEX, US_ZIP_CODE_REGEX } from '@/app/lib/constants';

export type { Vendor, Location, Circuit };

export type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type Avatar = {
  name?: string;
  email?: string;
  image?: string;
};

export type State = {
  name: string;
  abbreviation: string;
};

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

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid Email.' }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(32, 'Password must be less than 32 characters.'),
});
