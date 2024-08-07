'use client';

import { Button } from '@/app/ui/button';
import { deleteVendor } from '@/app/data/vendor';

export default function DeleteVendorForm({ vendorId }: { vendorId: number }) {
  const deleteVendorWithId = deleteVendor.bind(null, vendorId);

  return (
    <form id="vendor-form" action={deleteVendorWithId}>
      <Button type="submit" form="vendor-form" size="sm">
        Yes
      </Button>
    </form>
  );
}
