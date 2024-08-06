import type { Metadata } from 'next';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import CircuitsTable from '@/app/ui/circuits/table';
import { Button } from '@/app/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/ui/dialog';
import AddCircuitForm from '@/app/ui/circuits/add-form';

export const metadata: Metadata = {
  title: 'Circuits',
};

export default function Circuits() {
  return (
    <main>
      <PageHeader>
        <div className="flex items-center justify-between">
          <PageHeading>Circuits</PageHeading>
          <div className="space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">New Circuit</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Circuit</DialogTitle>
                </DialogHeader>
                <AddCircuitForm />
                <DialogFooter>
                  <Button type="submit" form="add-form" size="sm">
                    Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </PageHeader>
      <CircuitsTable />
    </main>
  );
}
