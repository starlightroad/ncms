import Link from 'next/link';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import CircuitsTable from '@/app/ui/circuits/table';
import { Button } from '@/app/ui/button';
import { TableSkeleton } from '@/app/ui/skeletons';

export const metadata: Metadata = {
  title: 'Circuits',
};

export default function Circuits() {
  return (
    <main>
      <PageHeader>
        <div className="flex items-center justify-between">
          <PageHeading>Circuits</PageHeading>
          <Button type="button" size="sm" asChild>
            <Link href="/circuits/new">New Circuit</Link>
          </Button>
        </div>
      </PageHeader>
      <Suspense fallback={<TableSkeleton />}>
        <CircuitsTable />
      </Suspense>
    </main>
  );
}
