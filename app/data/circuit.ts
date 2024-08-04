import type { Circuit } from '@/app/lib/types';

const placeholderData: Circuit[] = [
  {
    id: 3,
    name: 'Crown Castle Fiber',
    capacity: '100G',
    type: 'DWDM',
    location: {
      a: {
        street: '123 Main St',
        city: 'Miami',
        state: 'FL',
        zip: 33333,
      },
      z: {
        street: '456 Secondary St',
        city: 'Tampa',
        state: 'FL',
        zip: 99999,
      },
    },
  },
  {
    id: 1,
    name: 'Lumen',
    capacity: '10G',
    type: 'EVPL',
    location: {
      a: {
        street: '123 Main St',
        city: 'Doral',
        state: 'FL',
        zip: 11111,
      },
      z: {
        street: '456 Secondary St',
        city: 'West Palm Beach',
        state: 'FL',
        zip: 77777,
      },
    },
  },
];

export const getCircuits = () => {
  return placeholderData;
};

export const getCircuit = (id: number) => {
  const data = placeholderData.find((data) => data.id === id);
  return data;
};

export const deleteCircuit = (id: number) => {};
