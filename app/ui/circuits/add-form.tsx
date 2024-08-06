'use client';

import { Label } from '@/app/ui/label';
import { Input } from '@/app/ui/input';

export default function AddCircuitForm() {
  return (
    <form id="add-form" action="">
      <div className="space-y-4">
        <fieldset className="space-y-2">
          <Label htmlFor="vendor">Vendor</Label>
          <Input
            type="text"
            id="vendor"
            name="vendor"
            placeholder="Acme Networks"
            className="h-9"
          />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Input type="text" id="type" name="type" placeholder="DWDM" className="h-9" />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input type="text" id="capacity" name="capacity" placeholder="100G" className="h-9" />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="alocation">A Location</Label>
          <Input
            type="text"
            id="alocation"
            name="alocation"
            placeholder="123 Main St, New York, NY 10044"
            className="h-9"
          />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="zlocation">Z Location</Label>
          <Input
            type="text"
            id="zlocation"
            name="zlocation"
            placeholder="456 Main St, Los Angeles, CA 90031"
            className="h-9"
          />
        </fieldset>
      </div>
    </form>
  );
}
