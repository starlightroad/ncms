import type { Location } from '@/app/lib/types';
import { Label } from '@/app/ui/label';
import { Input } from '@/app/ui/input';

export default function EditLocationForm({ location }: { location: Location }) {
  return (
    <form id="location-form" action="">
      <div className="space-y-4">
        <fieldset className="space-y-2">
          <Label htmlFor="vendor">Street</Label>
          <Input
            type="text"
            id="street"
            name="street"
            placeholder="123 Main St"
            className="h-9"
            defaultValue={location.street}
          />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="type">City</Label>
          <Input
            type="text"
            id="city"
            name="city"
            placeholder="Miami"
            className="h-9"
            defaultValue={location.city}
          />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="capacity">State</Label>
          <Input
            type="text"
            id="state"
            name="state"
            placeholder="FL"
            className="h-9"
            defaultValue={location.state}
          />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="alocation">ZIP Code</Label>
          <Input
            type="text"
            id="zip"
            name="zip"
            placeholder="33111"
            className="h-9"
            defaultValue={location.zip}
          />
        </fieldset>
      </div>
    </form>
  );
}
