import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/ui/table';
import { formatAddress } from '@/app/lib/utils';
import TableActionsList from '@/app/ui/circuits/actions-list';
import { getCircuits } from '@/app/data/circuit';

export default function CircuitsTable() {
  const data = getCircuits();

  return (
    <div className="overflow-hidden rounded-xl border">
      <Table className="bg-white">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="text-xs uppercase">Vendor</TableHead>
            <TableHead className="text-xs uppercase">Type</TableHead>
            <TableHead className="text-xs uppercase">Capacity</TableHead>
            <TableHead className="text-xs uppercase">A Location</TableHead>
            <TableHead className="text-xs uppercase">Z Location</TableHead>
            <TableHead className="text-xs uppercase">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry) => {
            const locationA = formatAddress(entry.location.a, { format: 'short' });
            const locationZ = formatAddress(entry.location.z, { format: 'short' });

            return (
              <TableRow key={entry.id}>
                <TableCell className="text-gray-600">{entry.name}</TableCell>
                <TableCell className="text-gray-600">{entry.type}</TableCell>
                <TableCell className="text-gray-600">{entry.capacity}</TableCell>
                <TableCell className="text-gray-600">{locationA}</TableCell>
                <TableCell className="text-gray-600">{locationZ}</TableCell>
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
