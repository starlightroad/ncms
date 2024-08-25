import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/ui/table';
import { getFilteredVendors } from '@/app/data/vendor';
import TableActionsList from '@/app/ui/vendors/actions-list';
import { formatPhoneNumber } from '@/app/lib/utils';

type Props = {
  currentPage: number;
  query: string;
};

export default async function VendorsTable({ currentPage, query }: Props) {
  const data = await getFilteredVendors(currentPage, query);

  if (!data.length) {
    return (
      <div className="rounded-xl border bg-card p-5">
        <p className="text-center text-sm">No entries were found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <Table className="whitespace-nowrap">
        <TableHeader className="bg-background">
          <TableRow>
            <TableHead className="text-xs uppercase">Name</TableHead>
            <TableHead className="text-xs uppercase">Website</TableHead>
            <TableHead className="text-xs uppercase">Support Line</TableHead>
            <TableHead className="text-xs uppercase"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry) => {
            const vendorLink = `/dashboard/vendors/${entry.id}`;

            return (
              <TableRow key={entry.id}>
                <TableCell>
                  <Link href={vendorLink} className="text-primary hover:text-opacity-85">
                    {entry.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={entry.website}
                    target="_blank"
                    className="text-primary hover:text-opacity-85"
                  >
                    {entry.website}
                  </Link>
                </TableCell>
                <TableCell>{formatPhoneNumber(entry.phone)}</TableCell>
                <TableCell>
                  <TableActionsList vendor={entry} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
