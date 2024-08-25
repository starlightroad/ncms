'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/app/ui/chart';

const chartConfig = {
  loads: {
    label: 'Loads',
    color: '#2563eb',
  },
} satisfies ChartConfig;

type Props = {
  chartsData: { month: string; loads: number }[];
};

export default function MapLoadsChart({ chartsData }: Props) {
  return (
    <ChartContainer config={chartConfig} className="h-[186px] w-full">
      <BarChart accessibilityLayer data={chartsData.reverse()}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={8}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="loads" fill="var(--color-loads)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
