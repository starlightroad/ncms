'use client';

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import type { Circuit, Location, Vendor } from '@/app/lib/types';
import { Label } from '@/app/ui/label';
import { Input } from '@/app/ui/input';
import { Button } from '@/app/ui/button';
import FormStatusMessage from '@/app/ui/form-status-message';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { formatAddress } from '@/app/lib/utils';
import { updateCircuit } from '@/app/dashboard/circuits/actions';

type Props = {
  data: Circuit;
  locations: Location[];
  vendors: Vendor[];
};

const initialState = {
  message: '',
};

export default function EditCircuitForm({ data, locations, vendors }: Props) {
  const updateCircuitWithId = updateCircuit.bind(null, data.id);
  const [state, formAction] = useFormState(updateCircuitWithId, initialState);

  return (
    <form action={formAction}>
      <div className="space-y-4">
        {state?.message && <FormStatusMessage message={String(state.message)} />}
        <fieldset className="space-y-2">
          <Label htmlFor="circuitId">Circuit ID</Label>
          <Input
            type="text"
            id="circuitId"
            name="circuitId"
            placeholder="778622-WAVE-AN"
            className="h-9"
            defaultValue={data.cid}
          />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="vendorId">Vendor</Label>
          <Select name="vendorId" defaultValue={data.vendorId}>
            <SelectTrigger>
              <SelectValue placeholder="Select Vendor" />
            </SelectTrigger>
            <SelectContent>
              {vendors.map((vendor) => {
                return (
                  <SelectItem key={vendor.id} id={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Input
            type="text"
            id="type"
            name="type"
            placeholder="DWDM"
            className="h-9"
            defaultValue={data.type}
          />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            type="text"
            id="capacity"
            name="capacity"
            placeholder="100G"
            className="h-9"
            defaultValue={data.capacity}
          />
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="location1Id">A Location</Label>
          <Select name="location1Id" defaultValue={data.location1Id}>
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => {
                const { street, city, state, zip } = location;
                const address = formatAddress({ street, city, state, zip });

                return (
                  <SelectItem key={location.id} id={location.id} value={location.id}>
                    {address}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </fieldset>
        <fieldset className="space-y-2">
          <Label htmlFor="location2Id">Z Location</Label>
          <Select name="location2Id" defaultValue={data.location2Id}>
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => {
                const { street, city, state, zip } = location;
                const address = formatAddress({ street, city, state, zip });

                return (
                  <SelectItem key={location.id} id={location.id} value={location.id}>
                    {address}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </fieldset>
        <div className="flex justify-end space-x-3">
          <Button type="button" size="sm" variant="secondary" asChild>
            <Link href="/dashboard/circuits">Cancel</Link>
          </Button>
          <FormButton />
        </div>
      </div>
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" disabled={pending}>
      Update
    </Button>
  );
}
