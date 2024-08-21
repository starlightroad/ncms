import { Suspense } from 'react';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import { DashboardCardsSkeleton, DashboardSingleCardSkeleton } from '@/app/ui/skeletons';
import CardsWrapper from '@/app/ui/dashboard/cards';
import MapLoadsCard from '@/app/ui/dashboard/map-loads-card';
import CircuitsByCapacityCard from '@/app/ui/dashboard/circuit-capacities-card';

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
        <Suspense fallback={<DashboardSingleCardSkeleton />}>
          <MapLoadsCard />
        </Suspense>
        <Suspense fallback={<DashboardSingleCardSkeleton />}>
          <CircuitsByCapacityCard />
        </Suspense>
      </div>
    </main>
  );
}
