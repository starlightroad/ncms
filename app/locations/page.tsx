import type { Metadata } from 'next';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import LocationsTable from '@/app/ui/locations/table';
import AddLocationDialog from '@/app/ui/locations/add-dialog';

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
            <AddLocationDialog />
          </div>
        </div>
      </PageHeader>
      <LocationsTable />
    </main>
  );
}
