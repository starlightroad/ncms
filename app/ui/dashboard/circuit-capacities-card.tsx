import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/ui/card';
import { formatNumberToShorterNotation } from '@/app/lib/utils';
import CircuitCapacitiesChart from '@/app/ui/dashboard/circuit-capacities-chart';
import { getCircuits } from '@/app/data/circuit';

export default async function CircuitsByCapacityCard() {
  const circuits = await getCircuits();

  const chartData: { capacity: string; count: number; fill: string }[] = [];
  const colors = ['#2563eb', '#2563eb90', '#2563eb80', '#2563eb70'];

  if (!chartData.length) {
    circuits.forEach((circuit) => {
      const data = chartData.find(({ capacity }) => capacity === circuit.capacity);

      if (!data) {
        chartData.push({
          capacity: circuit.capacity,
          count: 1,
          fill: '',
        });
      } else {
        data.count += 1;
      }
    });

    chartData.forEach((e, idx) => (e.fill = colors[idx]));
  }

  const data = {
    label: 'Circuit Capacities',
    totalCount: chartData.length,
  };

  const formattedCount = formatNumberToShorterNotation(data.totalCount);

  return (
    <div className="col-span-4 row-span-2 max-h-80 w-full lg:col-span-3">
      <Card>
        <CardHeader className="pb-0">
          <header className="mb-8 space-y-2">
            <CardTitle className="font-medium uppercase text-gray-900">{formattedCount}</CardTitle>
            <CardDescription className="capitalize">{data.label}</CardDescription>
          </header>
        </CardHeader>
        <CardContent>
          <CircuitCapacitiesChart chartData={chartData} />
        </CardContent>
      </Card>
    </div>
  );
}
