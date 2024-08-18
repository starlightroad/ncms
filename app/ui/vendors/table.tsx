import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/ui/table';
import { getVendors } from '@/app/data/vendor';
import TableActionsList from '@/app/ui/vendors/actions-list';
import { formatPhoneNumber } from '@/app/lib/utils';

export default async function VendorsTable() {
  const data = await getVendors();

  if (!data.length) {
    return (
      <div className="rounded-xl border bg-white p-5">
        <p className="text-center text-sm text-gray-600">No entries were found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <Table className="bg-white">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="text-xs uppercase">Name</TableHead>
            <TableHead className="text-xs uppercase">Website</TableHead>
            <TableHead className="text-xs uppercase">Support Line</TableHead>
            <TableHead className="text-xs uppercase"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry) => {
            const vendorLink = `/vendors/${entry.id}`;

            return (
              <TableRow key={entry.id}>
                <TableCell className="text-gray-600">
                  <Link href={vendorLink} className="text-blue-600 hover:text-opacity-85">
                    {entry.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={entry.website}
                    target="_blank"
                    className="text-blue-600 hover:text-opacity-85"
                  >
                    {entry.website}
                  </Link>
                </TableCell>
                <TableCell className="text-gray-600">{formatPhoneNumber(entry.phone)}</TableCell>
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
