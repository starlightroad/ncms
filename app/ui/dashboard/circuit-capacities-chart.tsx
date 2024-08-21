'use client';
import { Pie, PieChart } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/app/ui/chart';

const chartConfig = {
  count: {
    label: 'Count',
  },
  '10G': {
    label: '10G',
    color: 'orange',
  },
  '100G': {
    label: '100G',
  },
} satisfies ChartConfig;

type Props = {
  chartData: { capacity: string; count: number }[];
};

export default function CircuitCapacitiesChart({ chartData }: Props) {
  return (
    <ChartContainer config={chartConfig} className="mx-auto max-h-56 w-full">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie dataKey="count" nameKey="capacity" data={chartData} />
      </PieChart>
    </ChartContainer>
  );
}
