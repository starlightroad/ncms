import { Suspense } from 'react';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import MapCard from '@/app/ui/dashboard/map-card';
import { DashboardCardsSkeleton, DashboardMapSkeleton } from '@/app/ui/skeletons';
import CardsWrapper from '@/app/ui/dashboard/cards';

export default function Dashboard() {
  return (
    <main className="w-full">
      <PageHeader>
        <PageHeading>Dashboard</PageHeading>
      </PageHeader>
      <div className="grid grid-cols-6 grid-rows-3 gap-6">
        <Suspense fallback={<DashboardCardsSkeleton />}>
          <CardsWrapper />
        </Suspense>
        <Suspense fallback={<DashboardMapSkeleton />}>
          <MapCard />
        </Suspense>
      </div>
    </main>
  );
}
