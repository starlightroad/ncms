import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import LocationsTable from '@/app/ui/locations/table';
import { Button } from '@/app/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/ui/dialog';
import AddLocationForm from '@/app/ui/locations/add-form';

export default function Locations() {
  return (
    <main>
      <PageHeader>
        <div className="flex items-center justify-between">
          <PageHeading>Locations</PageHeading>
          <div className="space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">New Location</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Location</DialogTitle>
                </DialogHeader>
                <AddLocationForm />
                <DialogFooter>
                  <Button type="submit" form="location-form" size="sm">
                    Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </PageHeader>
      <LocationsTable />
    </main>
  );
}
