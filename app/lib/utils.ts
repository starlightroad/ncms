import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Address } from '@/app/lib/types';
import { ELLIPSIS } from '@/app/lib/constants';

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

export const formatPhoneNumber = (phoneNumber: string) => {
  const match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})/);

  if (match) {
    const [areaCode, phonePrefix, lineNumber] = match.slice(1);
    return `${areaCode}-${phonePrefix}-${lineNumber}`;
  } else {
    return phoneNumber;
  }
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, idx) => idx + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, ELLIPSIS, totalPages];
  }

  if (currentPage >= totalPages - 4) {
    return [
      1,
      ELLIPSIS,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, ELLIPSIS, currentPage - 1, currentPage, currentPage + 1, ELLIPSIS, totalPages];
};
