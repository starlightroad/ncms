import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/ui/table';
import { getVendors } from '@/app/data/vendor';
import TableActionsList from '@/app/ui/vendors/actions-list';

export default function VendorsTable() {
  const data = getVendors();

  return (
    <div className="overflow-hidden rounded-xl border">
      <Table className="bg-white">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="text-xs uppercase">Name</TableHead>
            <TableHead className="text-xs uppercase">Website</TableHead>
            <TableHead className="text-xs uppercase">Support Line</TableHead>
            <TableHead className="text-xs uppercase">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry) => {
            return (
              <TableRow key={entry.id}>
                <TableCell className="text-gray-600">{entry.name}</TableCell>
                <TableCell>
                  <Link href={entry.website} className="text-blue-600 hover:text-opacity-85">
                    {entry.website}
                  </Link>
                </TableCell>
                <TableCell className="text-gray-600">{entry.supportLine}</TableCell>
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
