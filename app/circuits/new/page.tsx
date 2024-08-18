import type { Metadata } from 'next';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import AddCircuitForm from '@/app/ui/circuits/add-form';
import { getLocations } from '@/app/data/location';
import { getVendors } from '@/app/data/vendor';

export const metadata: Metadata = {
  title: 'New Circuit',
};

export default async function New() {
  const [locations, vendors] = await Promise.all([getLocations(), getVendors()]);

  return (
    <main>
      <PageHeader>
        <PageHeading>New Circuit</PageHeading>
      </PageHeader>
      <div className="rounded-xl border bg-white p-5">
        <AddCircuitForm locations={locations} vendors={vendors} />
      </div>
    </main>
  );
}
