import { Card } from '@/app/ui/card';
import { formatNumberToShorterNotation } from '@/app/lib/utils';

export default function MapLoadsCard() {
  const placeholderData = {
    label: 'map loads',
    totalCount: 203,
  };

  const formattedCount = formatNumberToShorterNotation(placeholderData.totalCount);

  return (
    <div className="col-span-3 row-span-2">
      <Card>
        <header className="mb-40 space-y-2">
          <h3 className="text-2xl font-medium uppercase text-gray-900">{formattedCount}</h3>
          <p className="text-sm capitalize text-gray-600">{placeholderData.label}</p>
        </header>
      </Card>
    </div>
  );
}
