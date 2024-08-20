import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowDownUpIcon, Edit2Icon, Trash2Icon } from 'lucide-react';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import { Button } from '@/app/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card';
import { getCircuit } from '@/app/data/circuit';
import DeleteCircuitModal from '@/app/ui/circuits/delete-modal';
import MapCard from '@/app/ui/map-card';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const circuit = await getCircuit(id);

  return {
    title: circuit?.cid ?? 'Not Found',
  };
}

const DeleteButton = (
  <Button type="button" size="sm" variant="outline" className="gap-1">
    <Trash2Icon className="h-4 w-4" />
    Delete
  </Button>
);

export default async function Circuit({ params }: { params: { id: string } }) {
  const data = await getCircuit(params.id);

  if (!data) {
    return notFound();
  }

  const items = [
    {
      label: 'vendor',
      description: (
        <Link href={`/vendors/${data.vendorId}`} className="text-blue-600 hover:text-opacity-85">
          {data.vendor.name}
        </Link>
      ),
    },
    {
      label: 'type',
      description: data.type,
    },
    {
      label: 'capacity',
      description: data.capacity,
    },
    {
      label: 'a location',
      description: (
        <Link
          href={`/locations/${data.location1Id}`}
          className="text-blue-600 hover:text-opacity-85"
        >
          {data.location1.name}
        </Link>
      ),
    },
    {
      label: 'z location',
      description: (
        <Link
          href={`/locations/${data.location2Id}`}
          className="text-blue-600 hover:text-opacity-85"
        >
          {data.location2.name}
        </Link>
      ),
    },
  ];

  const location1Coords = {
    lng: Number(data.location1.longitude),
    lat: Number(data.location1.latitude),
  };

  const location2Coords = {
    lng: Number(data.location2.longitude),
    lat: Number(data.location2.latitude),
  };

  const pins = [location1Coords, location2Coords];

  return (
    <main>
      <PageHeader>
        <div className="flex items-center justify-between">
          <PageHeading>{data.cid}</PageHeading>
          <div className="space-x-2">
            <Button type="button" size="sm" variant="outline" className="gap-1" asChild>
              <Link href={`/circuits/${data.id}/edit`}>
                <Edit2Icon className="h-4 w-4" />
                Edit
              </Link>
            </Button>
            <DeleteCircuitModal circuitId={data.id} trigger={DeleteButton} />
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
        <Card className="overflow-hidden">
          <CardContent className="h-full p-0">
            <MapCard pins={pins} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
