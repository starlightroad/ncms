import { MapPinIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card';
import { formatNumberToShorterNotation } from '@/app/lib/utils';

export default function LocationsCard({ count }: { count: number }) {
  const data = {
    label: 'locations',
    totalCount: count,
  };

  const formattedCount = formatNumberToShorterNotation(data.totalCount);
  const label = count < 2 ? data.label.slice(0, -1) : data.label;

  return (
    <div className="col-span-4 row-span-1 lg:col-span-2">
      <Card>
        <CardHeader className="pb-0">
          <header className="mb-8 flex items-center space-x-2">
            <MapPinIcon className="h-5 w-5 text-gray-900" />
            <CardTitle className="text-sm font-medium uppercase text-gray-900">
              {data.label}
            </CardTitle>
          </header>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-medium text-gray-900">{formattedCount}</p>
          <h4 className="text-sm capitalize text-gray-600">{label}</h4>
        </CardContent>
      </Card>
    </div>
  );
}
