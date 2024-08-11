'use client';

import { useState } from 'react';
import type { Vendor } from '@/app/lib/types';
import { PencilIcon } from 'lucide-react';
import { Button } from '@/app/ui/button';
import EditVendorForm from '@/app/ui/vendors/edit-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/ui/dialog';

export default function EditVendorDialog({ vendor }: { vendor: Vendor }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-7 px-1 text-gray-600">
          <PencilIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Vendor</DialogTitle>
          <DialogDescription className="sr-only">
            Edit the details below to make any changes.
          </DialogDescription>
        </DialogHeader>
        <EditVendorForm vendor={vendor} dialogState={{ setIsOpen }} />
      </DialogContent>
    </Dialog>
  );
}
