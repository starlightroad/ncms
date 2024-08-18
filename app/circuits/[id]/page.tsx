import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowDownUpIcon, Edit2Icon, MapIcon, Trash2Icon } from 'lucide-react';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import { Button } from '@/app/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card';
import { formatAddress } from '@/app/lib/utils';
import { getCircuit } from '@/app/data/circuit';
import DeleteCircuitModal from '@/app/ui/circuits/delete-modal';

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

  const locationA = formatAddress(data.location1);
  const locationZ = formatAddress(data.location2);

  const items = [
    { label: 'vendor', description: data.vendor.name },
    { label: 'type', description: data.type },
    { label: 'capacity', description: data.capacity },
    { label: 'a location', description: locationA },
    { label: 'z location', description: locationZ },
  ];

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
