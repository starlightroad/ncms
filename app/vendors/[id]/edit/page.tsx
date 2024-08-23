import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import EditVendorForm from '@/app/ui/vendors/edit-form';
import { getVendorById } from '@/app/data/vendor';

export const metadata: Metadata = {
  title: 'Edit Vendor',
};

export default async function Edit({ params }: { params: { id: string } }) {
  const data = await getVendorById(params.id);

  if (!data) {
    notFound();
  }

  return (
    <main className="py-8 lg:py-16">
      <PageHeader>
        <PageHeading>Edit Vendor</PageHeading>
      </PageHeader>
      <div className="rounded-xl border bg-white p-5">
        <EditVendorForm data={data} />
      </div>
    </main>
  );
}
