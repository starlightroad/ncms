'use client';

import Link from 'next/link';
import { useState } from 'react';
import { EyeIcon, Trash2Icon } from 'lucide-react';
import type { Vendor } from '@/app/lib/types';
import { Button } from '@/app/ui/button';
import DeleteVendorForm from '@/app/ui/vendors/delete-form';
import FormStatusMessage from '@/app/ui/form-status-message';
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
import EditVendorDialog from './edit-dialog';

export default function TableActionsList({ vendor }: { vendor: Vendor }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteFormActionMessage, setDeleteFormActionMessage] = useState('');

  return (
    <ul className="flex space-x-3">
      <li>
        <Link
          href={`/vendors/${vendor.id}`}
          className="block rounded-lg p-1 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <EyeIcon className="h-5 w-5" />
        </Link>
      </li>
      <li>
        <EditVendorDialog vendor={vendor} />
      </li>
      <li>
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="h-7 px-1 text-gray-600 hover:bg-red-100 hover:text-red-600"
            >
              <Trash2Icon className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Vendor</DialogTitle>
              <DialogDescription>Are you sure you want to delete this vendor?</DialogDescription>
            </DialogHeader>
            {deleteFormActionMessage && <FormStatusMessage message={deleteFormActionMessage} />}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" size="sm">
                  Cancel
                </Button>
              </DialogClose>
              <DeleteVendorForm
                vendorId={vendor.id}
                dialogState={{ setIsOpen: setIsDeleteOpen }}
                setFormMessage={setDeleteFormActionMessage}
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </li>
    </ul>
  );
}
