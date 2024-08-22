import Link from 'next/link';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import VendorsTable from '@/app/ui/vendors/table';
import { Button } from '@/app/ui/button';
import { TableSkeleton } from '@/app/ui/skeletons';
import { getVendorPages } from '@/app/data/vendor';
import Pagination from '@/app/ui/pagination';

export const metadata: Metadata = {
  title: 'Vendors',
};

type Props = {
  searchParams?: {
    page?: string;
    q?: string;
  };
};

export default async function Vendors({ searchParams }: Props) {
  const query = searchParams?.q || '';
  const currentPage = Number(searchParams?.page) || 1;
  const pages = await getVendorPages();

  return (
    <main>
      <PageHeader>
        <div className="flex items-center justify-between">
          <PageHeading>Vendors</PageHeading>
          <Button type="button" size="sm" asChild>
            <Link href="/vendors/new">New Vendor</Link>
          </Button>
        </div>
      </PageHeader>
      <Suspense fallback={<TableSkeleton />}>
        <VendorsTable currentPage={currentPage} query={query} />
      </Suspense>
      <div className="flex justify-end px-4 py-2">
        <Pagination pages={pages} />
      </div>
    </main>
  );
}
