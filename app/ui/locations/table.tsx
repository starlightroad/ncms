import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/ui/table';
import TableActionsList from '@/app/ui/locations/actions-list';
import { getFilteredLocations, getLocationPages } from '@/app/data/location';
import Pagination from '@/app/ui/pagination';

type Props = {
  currentPage: number;
  query: string;
};

export default async function LocationsTable({ currentPage, query }: Props) {
  const dataPromise = getFilteredLocations(currentPage, query);
  const pagesPromise = getLocationPages(query);
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
              <TableHead className="text-xs uppercase">Name</TableHead>
              <TableHead className="text-xs uppercase">Street</TableHead>
              <TableHead className="text-xs uppercase">City</TableHead>
              <TableHead className="text-xs uppercase">State</TableHead>
              <TableHead className="text-xs uppercase">ZIP Code</TableHead>
              <TableHead className="text-xs uppercase"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((entry) => {
              const locationLink = `/dashboard/locations/${entry.id}`;

              return (
                <TableRow key={entry.id}>
                  <TableCell>
                    <Link href={locationLink} className="text-primary hover:text-opacity-85">
                      {entry.name}
                    </Link>
                  </TableCell>
                  <TableCell>{entry.street}</TableCell>
                  <TableCell>{entry.city}</TableCell>
                  <TableCell>{entry.state}</TableCell>
                  <TableCell>{entry.zip}</TableCell>
                  <TableCell>
                    <TableActionsList location={entry} />
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
