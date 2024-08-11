'use client';

import { useState } from 'react';
import { Trash2Icon } from 'lucide-react';
import type { Vendor } from '@/app/lib/types';
import { Button } from '@/app/ui/button';
import FormStatusMessage from '@/app/ui/form-status-message';
import DeleteVendorForm from '@/app/ui/vendors/delete-form';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/ui/dialog';

export default function DeleteVendorDialog({ vendor }: { vendor: Vendor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="sm" variant="outline" className="gap-1">
          <Trash2Icon className="h-4 w-4 text-gray-600" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Vendor</DialogTitle>
          <DialogDescription>Are you sure you want to delete this vendor?</DialogDescription>
        </DialogHeader>
        {formMessage && <FormStatusMessage message={formMessage} />}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <DeleteVendorForm
            vendorId={vendor.id}
            dialogState={{ setIsOpen }}
            formState={{ setFormMessage }}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
