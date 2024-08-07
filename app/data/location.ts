import type { Location } from '@/app/lib/types';

const placeholderData: Location[] = [
  { id: 1, street: '123 Main St', city: 'Miami', state: 'FL', zip: 33333 },
  { id: 2, street: '456 Secondary St', city: 'Tampa', state: 'FL', zip: 99999 },
  { id: 3, street: '123 Main St', city: 'Doral', state: 'FL', zip: 11111 },
  { id: 4, street: '456 Secondary St', city: 'West Palm Beach', state: 'FL', zip: 77777 },
];

export const getLocations = () => {
  return placeholderData;
};

export const getLocation = (id: number) => {
  const data = placeholderData.find((data) => data.id === id);
  return data;
};

export const deleteLocation = (id: number) => {};
