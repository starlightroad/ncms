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

export const formatAddress = (address: Address, options?: { format: 'short' | 'full' }) => {
  const { street, city, state, zip } = address;

  if (options?.format === 'short') {
    return `${city}, ${state}`;
  }

  return `${street}, ${city}, ${state} ${zip}`;
};

export const mockSlowDataFetching = async <T>(
  fn: () => Promise<any>,
  seconds?: number,
): Promise<T> => {
  return await new Promise((res) => {
    setTimeout(
      async () => {
        return res(await fn());
      },
      1000 * (seconds ?? 2),
    );
  });
};
