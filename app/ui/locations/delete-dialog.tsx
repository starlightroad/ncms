import { useState } from 'react';
import { Trash2Icon } from 'lucide-react';
import { Button } from '@/app/ui/button';
import FormStatusMessage from '@/app/ui/form-status-message';
import DeleteLocationForm from '@/app/ui/locations/delete-form';
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

export default function DeleteLocationDialog({ locationId }: { locationId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          <DialogTitle>Delete Location</DialogTitle>
          <DialogDescription>Are you sure you want to delete this location?</DialogDescription>
        </DialogHeader>
        {formMessage && <FormStatusMessage message={formMessage} />}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <DeleteLocationForm
            locationId={locationId}
            dialogState={{ setIsOpen }}
            formState={{ setFormMessage }}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
