import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/ui/table';
import TableActionsList from '@/app/ui/locations/actions-list';
import { getLocations } from '@/app/data/location';

export default async function LocationsTable() {
  const data = await getLocations();

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
            <TableHead className="text-xs uppercase">Street</TableHead>
            <TableHead className="text-xs uppercase">City</TableHead>
            <TableHead className="text-xs uppercase">State</TableHead>
            <TableHead className="text-xs uppercase">ZIP Code</TableHead>
            <TableHead className="text-xs uppercase">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry) => {
            return (
              <TableRow key={entry.id}>
                <TableCell className="text-gray-600">{entry.name}</TableCell>
                <TableCell className="text-gray-600">{entry.street}</TableCell>
                <TableCell className="text-gray-600">{entry.city}</TableCell>
                <TableCell className="text-gray-600">{entry.state}</TableCell>
                <TableCell className="text-gray-600">{entry.zip}</TableCell>
                <TableCell>
                  <TableActionsList location={entry} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
