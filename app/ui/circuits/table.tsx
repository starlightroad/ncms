import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/ui/table';
import TableActionsList from '@/app/ui/circuits/actions-list';
import { getCircuitPages, getFilteredCircuits } from '@/app/data/circuit';
import Pagination from '@/app/ui/pagination';

type Props = {
  currentPage: number;
  query: string;
};

export default async function CircuitsTable({ currentPage, query }: Props) {
  const dataPromise = await getFilteredCircuits(currentPage, query);
  const pagesPromise = await getCircuitPages();
  const [data, pages] = await Promise.all([dataPromise, pagesPromise]);

  if (!data.length) {
    return (
      <div className="rounded-xl border bg-background p-5">
        <p className="text-center text-sm">No entries were found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-xl border">
        <Table className="whitespace-nowrap">
          <TableHeader className="bg-background">
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
              const circuitLink = `/dashboard/circuits/${entry.id}`;
              const vendorLink = `/dashboard/vendors/${entry.vendorId}`;
              const locationALink = `/dashboard/locations/${entry.location1Id}`;
              const locationZLink = `/dashboard/locations/${entry.location2Id}`;

              return (
                <TableRow key={entry.id}>
                  <TableCell>
                    <Link href={circuitLink} className="text-primary hover:text-opacity-85">
                      {entry.cid}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={vendorLink} className="text-primary hover:text-opacity-85">
                      {entry.vendor.name}
                    </Link>
                  </TableCell>
                  <TableCell>{entry.type}</TableCell>
                  <TableCell>{entry.capacity}</TableCell>
                  <TableCell>
                    <Link href={locationALink} className="text-primary hover:text-opacity-85">
                      {entry.location1.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={locationZLink} className="text-primary hover:text-opacity-85">
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
      <div className="flex justify-end px-4 py-2">
        <Pagination pages={pages} />
      </div>
    </div>
  );
}
