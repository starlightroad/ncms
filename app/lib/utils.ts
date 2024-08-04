import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Address } from '@/app/lib/types';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatNumberToShorterNotation = (num: number) => {
  if (num >= 1_000_000_000) {
    return `${Math.floor(num / 1_000_000_000)}B`;
  } else if (num >= 1_000_000) {
    return `${Math.floor(num / 1_000_000)}M`;
  } else if (num >= 1_000) {
    return `${Math.floor(num / 1_000)}K`;
  } else {
    return num.toString();
  }
};

export const formatAddress = (address: Address) => {
  const { street, city, state, zip } = address;
  return `${city}, ${state}`;
  // return `${street}, ${city}, ${state} ${zip}`;
};
