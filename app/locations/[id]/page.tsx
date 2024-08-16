import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Edit2Icon, MapIcon, MapPinIcon } from 'lucide-react';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import { Button } from '@/app/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card';
import { formatAddress } from '@/app/lib/utils';
import { getLocation } from '@/app/data/location';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const location = await getLocation(id);

  const metadata = {
    title: '',
  };

  if (!location) {
    metadata.title = 'Not Found';
  } else {
    metadata.title = formatAddress({
      street: location.street,
      city: location.city,
      state: location.state,
      zip: location.zip,
    });
  }

  return metadata;
}

export default async function Location({ params }: { params: { id: string } }) {
  const data = await getLocation(params.id);

  if (!data) {
    notFound();
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
            <Button type="button" size="sm" variant="outline" className="gap-1" asChild>
              <Link href={`/locations/${data.id}/edit`}>
                <Edit2Icon className="h-4 w-4" />
                Edit
              </Link>
            </Button>
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
