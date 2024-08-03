import CircuitsCard from '@/app/ui/dashboard/circuits-card';
import LocationsCard from '@/app/ui/dashboard/locations-card';
import VendorsCard from '@/app/ui/dashboard/vendors-card';
import RequestsCard from '@/app/ui/dashboard/requests-card';
import MapLoadsCard from '@/app/ui/dashboard/map-loads-card';

export default function Dashboard() {
  return (
    <main className="w-full">
      <header className="mb-6">
        <h1 className="text-2xl font-medium text-gray-900">Dashboard</h1>
      </header>
      <div className="grid grid-cols-6 grid-rows-3 gap-6">
        <CircuitsCard />
        <LocationsCard />
        <VendorsCard />
        <RequestsCard />
        <MapLoadsCard />
      </div>
    </main>
  );
}
