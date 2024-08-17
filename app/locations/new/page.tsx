import type { Metadata } from 'next';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import AddLocationForm from '@/app/ui/locations/add-form';

export const metadata: Metadata = {
  title: 'New Location',
};

export default function New() {
  return (
    <main>
      <PageHeader>
        <PageHeading>New Location</PageHeading>
      </PageHeader>
      <div className="rounded-xl border bg-white p-5">
        <AddLocationForm />
      </div>
    </main>
  );
}
