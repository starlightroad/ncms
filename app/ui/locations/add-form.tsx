'use client';

import { Label } from '@/app/ui/label';
import { Input } from '@/app/ui/input';

export default function AddLocationForm() {
  return (
    <form id="location-form" action="">
      <div className="space-y-4">
        <fieldset className="space-y-2">
          <Label htmlFor="street">Street</Label>
          <Input type="text" id="street" name="street" placeholder="123 Main St" className="h-9" />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input type="text" id="city" name="city" placeholder="Miami" className="h-9" />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input type="text" id="state" name="state" placeholder="FL" className="h-9" />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="zip">ZIP Code</Label>
          <Input type="text" id="zip" name="zip" placeholder="33111" className="h-9" />
        </fieldset>
      </div>
    </form>
  );
}
