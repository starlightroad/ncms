'use client';

import { useState } from 'react';
import { Edit2Icon } from 'lucide-react';
import type { Vendor } from '@/app/lib/types';
import EditVendorForm from '@/app/ui/vendors/edit-form';
import { Button } from '@/app/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/ui/dialog';

export default function EditVendorDialog({ vendor }: { vendor: Vendor }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="sm" variant="outline" className="gap-1">
          <Edit2Icon className="h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Vendor</DialogTitle>
        </DialogHeader>
        <EditVendorForm vendor={vendor} dialogState={{ setIsOpen }} />
      </DialogContent>
    </Dialog>
  );
}
