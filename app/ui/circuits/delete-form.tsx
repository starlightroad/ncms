'use client';

import { Button } from '@/app/ui/button';
import { deleteCircuit } from '@/app/data/circuit';

export default function DeleteCircuitForm({ circuitId }: { circuitId: number }) {
  const deleteCircuitWithId = deleteCircuit.bind(null, circuitId);

  return (
    <form action={deleteCircuitWithId}>
      <Button type="submit" size="sm">
        Yes
      </Button>
    </form>
  );
}
