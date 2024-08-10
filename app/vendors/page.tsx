import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import VendorsTable from '@/app/ui/vendors/table';
import { Button } from '@/app/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/ui/dialog';
import AddVendorForm from '@/app/ui/vendors/add-form';

export const metadata: Metadata = {
  title: 'Vendors',
};

function TableSkeleton() {
  return (
    <div className="bg-white">
      <div className="h-72 animate-pulse rounded-xl bg-gray-100"></div>
    </div>
  );
}

export default function Vendors() {
  return (
    <main>
      <PageHeader>
        <div className="flex items-center justify-between">
          <PageHeading>Vendors</PageHeading>
          <div className="space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">New Vendor</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Vendor</DialogTitle>
                </DialogHeader>
                <AddVendorForm />
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
      <Suspense fallback={<TableSkeleton />}>
        <VendorsTable />
      </Suspense>
    </main>
  );
}
