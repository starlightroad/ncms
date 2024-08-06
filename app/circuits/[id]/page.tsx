import { ArrowDownUpIcon, Edit2Icon, MapIcon, Trash2Icon } from 'lucide-react';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import { Button } from '@/app/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card';
import EditCircuitForm from '@/app/ui/circuits/edit-form';
import DeleteCircuitForm from '@/app/ui/circuits/delete-form';
import { formatAddress } from '@/app/lib/utils';
import { getCircuit } from '@/app/data/circuit';
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

export default function Circuit({ params }: { params: { id: string } }) {
  const data = getCircuit(Number(params.id));

  if (!data) {
    return (
      <main>
        <PageHeader>
          <PageHeading>Circuit With ID {params.id} Was Not Found</PageHeading>
        </PageHeader>
      </main>
    );
  }

  const locationA = formatAddress(data.location.a);
  const locationZ = formatAddress(data.location.z);

  const items = [
    { label: 'vendor', description: data.name },
    { label: 'type', description: data.type },
    { label: 'capacity', description: data.capacity },
    { label: 'a location', description: locationA },
    { label: 'z location', description: locationZ },
  ];

  return (
    <main>
      <PageHeader>
        <div className="flex items-center justify-between">
          <PageHeading>{params.id}</PageHeading>
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
                  <DialogTitle>Edit Circuit</DialogTitle>
                </DialogHeader>
                <EditCircuitForm circuit={data} />
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
                    Are you sure you want to delete this circuit?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline" size="sm">
                      Cancel
                    </Button>
                  </DialogClose>
                  <DeleteCircuitForm circuitId={data.id} />
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
              <ArrowDownUpIcon className="h-5 w-5 text-gray-900" />
              <CardTitle className="text-sm font-medium uppercase text-gray-900">
                Circuit Details
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
