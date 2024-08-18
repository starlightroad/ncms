import { Building2Icon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card';
import { formatNumberToShorterNotation } from '@/app/lib/utils';

export default function VendorsCard({ count }: { count: number }) {
  const data = {
    label: 'vendors',
    totalCount: count,
  };

  const formattedCount = formatNumberToShorterNotation(data.totalCount);
  const label = count < 2 ? data.label.slice(0, -1) : data.label;

  return (
    <div className="col-span-2 row-span-1">
      <Card>
        <CardHeader className="pb-0">
          <header className="mb-8 flex items-center space-x-2">
            <Building2Icon className="h-5 w-5 text-gray-900" />
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
