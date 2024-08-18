import Link from 'next/link';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import LocationsTable from '@/app/ui/locations/table';
import { Button } from '@/app/ui/button';
import { TableSkeleton } from '@/app/ui/skeletons';

export const metadata: Metadata = {
  title: 'Locations',
};

export default function Locations() {
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
        <LocationsTable />
      </Suspense>
    </main>
  );
}
