import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import EditCircuitForm from '@/app/ui/circuits/edit-form';
import { getCircuit } from '@/app/data/circuit';
import { getVendors } from '@/app/data/vendor';
import { getLocations } from '@/app/data/location';

export const metadata: Metadata = {
  title: 'Edit Circuit',
};

export default async function Edit({ params }: { params: { id: string } }) {
  const data = await getCircuit(params.id);

  if (!data) {
    notFound();
  }

  const [locations, vendors] = await Promise.all([getLocations(), getVendors()]);

  return (
    <main>
      <PageHeader>
        <PageHeading>Edit Circuit</PageHeading>
      </PageHeader>
      <div className="rounded-xl border bg-white p-5">
        <EditCircuitForm data={data} locations={locations} vendors={vendors} />
      </div>
    </main>
  );
}
