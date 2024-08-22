import { readFile } from 'node:fs/promises';
import type { State } from '@/app/lib/types';

export const getStates = async () => {
  try {
    const file = await readFile('./app/data/states.json', 'utf-8');
    const states: State[] = JSON.parse(file);

    return states;
  } catch (error) {
    return [];
  }
};
