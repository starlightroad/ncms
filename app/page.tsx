import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import CircuitsCard from '@/app/ui/dashboard/circuits-card';
import LocationsCard from '@/app/ui/dashboard/locations-card';
import VendorsCard from '@/app/ui/dashboard/vendors-card';
import MapCard from '@/app/ui/dashboard/map-card';

export default function Dashboard() {
  return (
    <main className="w-full">
      <PageHeader>
        <PageHeading>Dashboard</PageHeading>
      </PageHeader>
      <div className="grid grid-cols-6 grid-rows-3 gap-6">
        <CircuitsCard />
        <LocationsCard />
        <VendorsCard />
        <MapCard />
      </div>
    </main>
  );
}
