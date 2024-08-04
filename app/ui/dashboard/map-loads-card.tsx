import { Card, CardDescription, CardHeader, CardTitle } from '@/app/ui/card';
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
        <CardHeader className="pb-0">
          <header className="mb-40 space-y-2">
            <CardTitle className="font-medium uppercase text-gray-900">{formattedCount}</CardTitle>
            <CardDescription className="capitalize">{placeholderData.label}</CardDescription>
          </header>
        </CardHeader>
      </Card>
    </div>
  );
}
