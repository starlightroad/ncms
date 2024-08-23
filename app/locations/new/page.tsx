import type { Metadata } from 'next';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import AddLocationForm from '@/app/ui/locations/add-form';
import { getStates } from '@/app/data/state';

export const metadata: Metadata = {
  title: 'New Location',
};

export default async function New() {
  const statesJson = await getStates();
  const data = {
    states: statesJson,
  };

  return (
    <main className="py-8 lg:py-16">
      <PageHeader>
        <PageHeading>New Location</PageHeading>
      </PageHeader>
      <div className="rounded-xl border bg-card p-5">
        <AddLocationForm data={data} />
      </div>
    </main>
  );
}
