import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/ui/table';
import TableActionsList from '@/app/ui/circuits/actions-list';
import { getFilteredCircuits } from '@/app/data/circuit';

export default async function CircuitsTable({ currentPage }: { currentPage: number }) {
  const data = await getFilteredCircuits(currentPage);

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
            <TableHead className="text-xs uppercase">Circuit ID</TableHead>
            <TableHead className="text-xs uppercase">Vendor</TableHead>
            <TableHead className="text-xs uppercase">Type</TableHead>
            <TableHead className="text-xs uppercase">Capacity</TableHead>
            <TableHead className="text-xs uppercase">A Location</TableHead>
            <TableHead className="text-xs uppercase">Z Location</TableHead>
            <TableHead className="text-xs uppercase"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry) => {
            const circuitLink = `/circuits/${entry.id}`;
            const vendorLink = `/vendors/${entry.vendorId}`;
            const locationALink = `/locations/${entry.location1Id}`;
            const locationZLink = `/locations/${entry.location2Id}`;

            return (
              <TableRow key={entry.id}>
                <TableCell className="text-gray-600">
                  <Link href={circuitLink} className="text-blue-600 hover:text-opacity-85">
                    {entry.cid}
                  </Link>
                </TableCell>
                <TableCell className="text-gray-600">
                  <Link href={vendorLink} className="text-blue-600 hover:text-opacity-85">
                    {entry.vendor.name}
                  </Link>
                </TableCell>
                <TableCell className="text-gray-600">{entry.type}</TableCell>
                <TableCell className="text-gray-600">{entry.capacity}</TableCell>
                <TableCell className="text-gray-600">
                  <Link href={locationALink} className="text-blue-600 hover:text-opacity-85">
                    {entry.location1.name}
                  </Link>
                </TableCell>
                <TableCell className="text-gray-600">
                  <Link href={locationZLink} className="text-blue-600 hover:text-opacity-85">
                    {entry.location2.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <TableActionsList circuit={entry} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
