import type { Metadata } from 'next';
import { getCircuits } from '@/app/data/circuit';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import CircuitsTable from '@/app/ui/circuits/table';

export const metadata: Metadata = {
  title: 'Circuits',
};

export default function Circuits() {
  const circuits = getCircuits();

  return (
    <main>
      <PageHeader>
        <PageHeading>Circuits</PageHeading>
      </PageHeader>
      <CircuitsTable data={circuits} />
    </main>
  );
}
