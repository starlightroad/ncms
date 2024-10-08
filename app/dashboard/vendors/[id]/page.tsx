import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Building2Icon, Edit2Icon, Trash2Icon } from 'lucide-react';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card';
import { getVendorById } from '@/app/data/vendor';
import DeleteVendorModal from '@/app/ui/vendors/delete-modal';
import { formatPhoneNumber } from '@/app/lib/utils';
import { Button } from '@/app/ui/button';

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

const DeleteButton = (
  <Button type="button" size="sm" variant="outline" className="gap-1">
    <Trash2Icon className="h-4 w-4" />
    Delete
  </Button>
);

export default async function Vendor({ params }: { params: { id: string } }) {
  const data = await getVendorById(params.id);

  if (!data) {
    notFound();
  }

  const items = [
    {
      label: 'Name',
      description: data.name,
    },
    {
      label: 'Website',
      description: (
        <Link href={data.website} target="_blank" className="text-primary hover:text-opacity-85">
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
    <main className="py-8 lg:py-16">
      <PageHeader>
        <div className="flex items-center justify-end lg:justify-between">
          <div className="hidden lg:block">
            <PageHeading>{data.name}</PageHeading>
          </div>
          <div className="space-x-2">
            <Button type="button" size="sm" variant="outline" className="gap-1" asChild>
              <Link href={`/dashboard/vendors/${data.id}/edit`}>
                <Edit2Icon className="h-4 w-4" />
                Edit
              </Link>
            </Button>
            <DeleteVendorModal vendorId={data.id} trigger={DeleteButton} />
          </div>
        </div>
      </PageHeader>
      <div>
        <Card>
          <CardHeader className="pb-0">
            <header className="mb-8 flex items-center space-x-2">
              <Building2Icon className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-sm font-medium uppercase text-muted-foreground">
                Vendor Details
              </CardTitle>
            </header>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => {
              const key = `key-${params.id}-${item.label}`;

              return (
                <article key={key}>
                  <h3 className="font-medium capitalize">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </article>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
