'use client';

import { useState } from 'react';
import { Button } from '@/app/ui/button';
import AddLocationForm from '@/app/ui/locations/add-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/ui/dialog';

export default function AddLocationDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">New Location</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Location</DialogTitle>
          <DialogDescription className="sr-only">
            Fill in the details below to create a new entry.
          </DialogDescription>
        </DialogHeader>
        <AddLocationForm dialogState={{ setIsOpen }} />
      </DialogContent>
    </Dialog>
  );
}
