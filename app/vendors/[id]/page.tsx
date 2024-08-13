import type { Metadata } from 'next';
import { Building2Icon } from 'lucide-react';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card';
import { getVendorById } from '@/app/data/vendor';
import EditVendorDialog from '@/app/ui/vendors/[id]/edit-dialog';
import DeleteVendorDialog from '@/app/ui/vendors/[id]/delete-dialog';
import { formatPhoneNumber } from '@/app/lib/utils';
import Link from 'next/link';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const vendor = await getVendorById(id);

  return {
    title: vendor?.name ?? 'Vendor Not Found',
  };
}

export default async function Vendor({ params }: { params: { id: string } }) {
  const data = await getVendorById(params.id);

  if (!data) {
    return (
      <main>
        <PageHeader>
          <PageHeading>Vendor Not Found</PageHeading>
        </PageHeader>
        <div className="rounded-xl border bg-white p-5">
          <p className="text-center text-sm text-gray-600">
            The Vendor with the ID <span className="font-medium">{params.id}</span> was not found.
          </p>
        </div>
      </main>
    );
  }

  const items = [
    {
      label: 'Name',
      description: data.name,
    },
    {
      label: 'Website',
      description: (
        <Link href={data.website} target="_blank" className="text-blue-600 hover:text-opacity-85">
          {data.website}
        </Link>
      ),
    },
    {
      label: 'Support Line',
      description: formatPhoneNumber(data.phone),
    },
  ];

  return (
    <main>
      <PageHeader>
        <div className="flex items-center justify-between">
          <PageHeading>{data.name}</PageHeading>
          <div className="space-x-2">
            <EditVendorDialog vendor={data} />
            <DeleteVendorDialog vendor={data} />
          </div>
        </div>
      </PageHeader>
      <div>
        <Card>
          <CardHeader className="pb-0">
            <header className="mb-8 flex items-center space-x-2">
              <Building2Icon className="h-5 w-5 text-gray-900" />
              <CardTitle className="text-sm font-medium uppercase text-gray-900">
                Vendor Details
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
      </div>
    </main>
  );
}
