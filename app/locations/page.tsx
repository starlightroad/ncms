import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import LocationsTable from '@/app/ui/locations/table';

export default function Locations() {
  return (
    <main>
      <PageHeader>
        <PageHeading>Locations</PageHeading>
      </PageHeader>
      <LocationsTable />
    </main>
  );
}
