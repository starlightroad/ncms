import type { Metadata } from 'next';
import { Edit2Icon, MapIcon, MapPinIcon, Trash2Icon } from 'lucide-react';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import { Button } from '@/app/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card';
import EditLocationForm from '@/app/ui/locations/edit-form';
import DeleteLocationForm from '@/app/ui/locations/delete-form';
import { formatAddress } from '@/app/lib/utils';
import { getLocation } from '@/app/data/location';
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

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const location = getLocation(Number(id));

  return {
    title: !location ? 'Not Found' : formatAddress(location),
  };
}

export default function Location({ params }: { params: { id: string } }) {
  const data = getLocation(Number(params.id));

  if (!data) {
    return (
      <main>
        <PageHeader>
          <PageHeading>Location With ID {params.id} Was Not Found</PageHeading>
        </PageHeader>
      </main>
    );
  }

  const items = [
    {
      label: 'Name',
      description: data.name,
    },
    {
      label: 'Street',
      description: data.street,
    },
    {
      label: 'City',
      description: data.city,
    },
    {
      label: 'State',
      description: data.state,
    },
    {
      label: 'ZIP Code',
      description: data.zip,
    },
  ];

  return (
    <main>
      <PageHeader>
        <div className="flex items-center justify-between">
          <PageHeading>{formatAddress(data)}</PageHeading>
          <div className="space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" size="sm" variant="outline" className="gap-1">
                  <Edit2Icon className="h-4 w-4" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Location</DialogTitle>
                </DialogHeader>
                <EditLocationForm location={data} />
                <DialogFooter>
                  <Button type="submit" form="edit-form">
                    Update
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" size="sm" variant="outline" className="gap-1">
                  <Trash2Icon className="h-4 w-4 text-gray-600" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Circuit</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this location?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline" size="sm">
                      Cancel
                    </Button>
                  </DialogClose>
                  <DeleteLocationForm locationId={data.id} />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </PageHeader>
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-0">
            <header className="mb-8 flex items-center space-x-2">
              <MapPinIcon className="h-5 w-5 text-gray-900" />
              <CardTitle className="text-sm font-medium uppercase text-gray-900">
                Location Details
              </CardTitle>
            </header>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => {
              const key = `key-${params.id}-${item.label}`;

              return (
                <article key={key}>
                  <h3 className="font-medium capitalize text-gray-900">{item.label}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </article>
              );
            })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-0">
            <header className="mb-8 flex items-center space-x-2">
              <MapIcon className="h-5 w-5 text-gray-900" />
              <CardTitle className="text-sm font-medium uppercase text-gray-900">Map</CardTitle>
            </header>
          </CardHeader>
        </Card>
      </div>
    </main>
  );
}
