import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/ui/card';
import MapLoadsChart from '@/app/ui/dashboard/map-loads-chart';
import { getMapLoadsLast6Months } from '@/app/data/stat';
import { formatNumberToShorterNotation } from '@/app/lib/utils';
import { MONTHS } from '@/app/lib/constants';

export default async function MapLoadsCard() {
  const stats = await getMapLoadsLast6Months();
  let chartsData = stats.length !== 6 ? new Array(6).fill(null) : [];

  chartsData = chartsData.map((_, idx) => {
    const currentMonth = new Date().getMonth();
    const monthMatches = stats.find((s) => s.monthId === currentMonth - idx);

    return {
      month: monthMatches ? MONTHS[monthMatches?.monthId] : MONTHS[currentMonth - idx],
      loads: monthMatches ? monthMatches.count : 0,
    };
  });

  const cardData = {
    label: 'map loads',
    totalCount: chartsData.reduce((accum, el) => accum + el.loads, 0),
  };

  const formattedCount = formatNumberToShorterNotation(cardData.totalCount);

  return (
    <div className="col-span-4 row-span-2 max-h-80 w-full lg:col-span-3">
      <Card>
        <CardHeader className="pb-0">
          <header className="mb-8 space-y-2">
            <CardTitle className="font-medium uppercase">{formattedCount}</CardTitle>
            <CardDescription className="capitalize">{cardData.label}</CardDescription>
          </header>
        </CardHeader>
        <CardContent>
          <MapLoadsChart chartsData={chartsData.reverse()} />
        </CardContent>
      </Card>
    </div>
  );
}
