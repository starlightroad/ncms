import type { Vendor } from '@/app/lib/types';

const placeholderData: Vendor[] = [
  {
    id: 1,
    name: 'Crown Castle Fiber',
    website: 'https://crowncastle.com',
    supportLine: '888-123-4567',
  },
  {
    id: 2,
    name: 'Lumen',
    website: 'https://lumen.com',
    supportLine: '888-246-8100',
  },
  {
    id: 3,
    name: 'Zayo',
    website: 'https://zayo.com',
    supportLine: '888-369-1215',
  },
];

export const getVendors = () => {
  return placeholderData;
};

export const deleteVendor = (id: number) => {};
