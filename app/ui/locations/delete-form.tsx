'use client';

import { Button } from '@/app/ui/button';
import { deleteLocation } from '@/app/data/location';

export default function DeleteLocationForm({ locationId }: { locationId: number }) {
  const deleteLocationWithId = deleteLocation.bind(null, locationId);

  return (
    <form id="location-form" action={deleteLocationWithId}>
      <Button type="submit" form="location-form" size="sm">
        Update
      </Button>
    </form>
  );
}
