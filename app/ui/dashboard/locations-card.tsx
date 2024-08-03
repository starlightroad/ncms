import { MapPinIcon } from 'lucide-react';
import { Card } from '@/app/ui/card';
import { formatNumberToShorterNotation } from '@/app/lib/utils';

export default function LocationsCard() {
  const placeholderData = {
    label: 'locations',
    totalCount: 8,
  };

  const formattedCount = formatNumberToShorterNotation(placeholderData.totalCount);

  return (
    <div className="col-span-2 row-span-1">
      <Card>
        <header className="mb-8 flex items-center space-x-2">
          <MapPinIcon className="h-5 w-5 text-gray-900" />
          <h3 className="text-sm font-medium uppercase text-gray-900">{placeholderData.label}</h3>
        </header>
        <div>
          <p className="text-2xl font-medium text-gray-900">{formattedCount}</p>
          <h4 className="text-sm capitalize text-gray-600">{placeholderData.label}</h4>
        </div>
      </Card>
    </div>
  );
}
