'use client';

import { useContext } from 'react';
import { DialogContext } from '@/app/ui/dialog-provider';
import { Button } from '@/app/ui/button';
import AddVendorForm from '@/app/ui/vendors/add-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/ui/dialog';

export default function AddVendorDialog() {
  const { isOpen, setIsOpen } = useContext(DialogContext);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">New Vendor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Vendor</DialogTitle>
          <DialogDescription className="sr-only">
            Fill in the details below to create a new entry.
          </DialogDescription>
        </DialogHeader>
        <AddVendorForm />
        <DialogFooter>
          <Button type="submit" form="vendor-form" size="sm">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
