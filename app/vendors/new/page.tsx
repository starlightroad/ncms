import type { Metadata } from 'next';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import AddVendorForm from '@/app/ui/vendors/add-form';

export const metadata: Metadata = {
  title: 'New Vendor',
};

export default function New() {
  return (
    <main className="py-8 lg:py-16">
      <PageHeader>
        <PageHeading>New Vendor</PageHeading>
      </PageHeader>
      <div className="rounded-xl border bg-white p-5">
        <AddVendorForm />
      </div>
    </main>
  );
}
