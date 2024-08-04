import { ArrowDownUpIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card';
import { formatNumberToShorterNotation } from '@/app/lib/utils';

export default function CircuitsCard() {
  const placeholderData = {
    label: 'circuits',
    totalCount: 12,
  };

  const formattedCount = formatNumberToShorterNotation(placeholderData.totalCount);

  return (
    <div className="col-span-2 row-span-1">
      <Card>
        <CardHeader className="pb-0">
          <header className="mb-8 flex items-center space-x-2">
            <ArrowDownUpIcon className="h-5 w-5 text-gray-900" />
            <CardTitle className="text-sm font-medium uppercase text-gray-900">
              {placeholderData.label}
            </CardTitle>
          </header>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-medium text-gray-900">{formattedCount}</p>
          <h4 className="text-sm capitalize text-gray-600">{placeholderData.label}</h4>
        </CardContent>
      </Card>
    </div>
  );
}
