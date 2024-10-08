import type { Metadata } from 'next';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import AddVendorForm from '@/app/ui/vendors/add-form';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'New Vendor',
};

export default async function New() {
  return (
    <main className="py-8 lg:py-16">
      <PageHeader>
        <PageHeading>New Vendor</PageHeading>
      </PageHeader>
      <div className="rounded-xl border bg-card p-5">
        <AddVendorForm />
      </div>
    </main>
  );
}
