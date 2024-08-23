import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import EditLocationForm from '@/app/ui/locations/edit-form';
import { getLocation } from '@/app/data/location';

export const metadata: Metadata = {
  title: 'Edit Location',
};

export default async function Edit({ params }: { params: { id: string } }) {
  const data = await getLocation(params.id);

  if (!data) {
    notFound();
  }

  return (
    <main className="py-8 lg:py-16">
      <PageHeader>
        <PageHeading>Edit Location</PageHeading>
      </PageHeader>
      <div className="rounded-xl border bg-white p-5">
        <EditLocationForm data={data} />
      </div>
    </main>
  );
}
