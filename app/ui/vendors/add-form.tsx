'use client';

import { Label } from '@/app/ui/label';
import { Input } from '@/app/ui/input';

export default function AddVendorForm() {
  return (
    <form id="location-form" action="">
      <div className="space-y-4">
        <fieldset className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" placeholder="Acme Fiber" className="h-9" />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            type="text"
            id="website"
            name="website"
            placeholder="acmefiber.com"
            className="h-9"
          />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="phone">Support Line</Label>
          <Input type="text" id="phone" name="phone" placeholder="8881239876" className="h-9" />
        </fieldset>
      </div>
    </form>
  );
}
