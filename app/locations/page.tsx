import Link from 'next/link';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import LocationsTable from '@/app/ui/locations/table';
import { Button } from '@/app/ui/button';
import { TableSkeleton } from '@/app/ui/skeletons';
import Pagination from '@/app/ui/pagination';
import { getLocationPages } from '@/app/data/location';

export const metadata: Metadata = {
  title: 'Locations',
};

type Props = {
  searchParams?: {
    page?: string;
    q?: string;
  };
};

export default async function Locations({ searchParams }: Props) {
  const query = searchParams?.q || '';
  const currentPage = Number(searchParams?.page) || 1;
  const pages = await getLocationPages();

  return (
    <main>
      <PageHeader>
        <div className="flex items-center justify-between">
          <PageHeading>Locations</PageHeading>
          <div className="space-x-2">
            <Button type="button" size="sm" asChild>
              <Link href="/locations/new">New Location</Link>
            </Button>
          </div>
        </div>
      </PageHeader>
      <Suspense fallback={<TableSkeleton />}>
        <LocationsTable currentPage={currentPage} query={query} />
      </Suspense>
      <div className="flex justify-end px-4 py-2">
        <Pagination pages={pages} />
      </div>
    </main>
  );
}
