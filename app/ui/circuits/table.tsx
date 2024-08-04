import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/ui/table';
import type { Circuit } from '@/app/lib/types';
import { formatAddress } from '@/app/lib/utils';
import ActionsList from '@/app/ui/circuits/actions-list';

export default function CircuitsTable({ data }: { data: Circuit[] }) {
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
            const locationA = formatAddress(entry.location.a);
            const locationZ = formatAddress(entry.location.z);

            return (
              <TableRow key={entry.id}>
                <TableCell className="text-gray-600">{entry.name}</TableCell>
                <TableCell className="text-gray-600">{entry.type}</TableCell>
                <TableCell className="text-gray-600">{entry.capacity}</TableCell>
                <TableCell className="text-gray-600">{locationA}</TableCell>
                <TableCell className="text-gray-600">{locationZ}</TableCell>
                <TableCell>
                  <ActionsList circuitId={entry.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
