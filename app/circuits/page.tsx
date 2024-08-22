import Link from 'next/link';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import CircuitsTable from '@/app/ui/circuits/table';
import { Button } from '@/app/ui/button';
import { TableSkeleton } from '@/app/ui/skeletons';
import { getCircuitPages } from '@/app/data/circuit';
import Pagination from '@/app/ui/pagination';

export const metadata: Metadata = {
  title: 'Circuits',
};

type Props = {
  searchParams?: {
    page?: string;
    q?: string;
  };
};

export default async function Circuits({ searchParams }: Props) {
  const query = searchParams?.q || '';
  const currentPage = Number(searchParams?.page) || 1;
  const pages = await getCircuitPages();

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
        <CircuitsTable currentPage={currentPage} query={query} />
      </Suspense>
      <div className="flex justify-end px-4 py-2">
        <Pagination pages={pages} />
      </div>
    </main>
  );
}
