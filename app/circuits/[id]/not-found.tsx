import Link from 'next/link';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import { Button } from '@/app/ui/button';

export default function NotFound() {
  return (
    <main>
      <PageHeader>
        <PageHeading>404 Not Found</PageHeading>
      </PageHeader>
      <div className="space-y-3 rounded-xl border bg-white p-5">
        <p className="text-sm text-gray-600">Could not find the requested circuit.</p>
        <Button size="sm" asChild>
          <Link href="/circuits">Go to Circuits</Link>
        </Button>
      </div>
    </main>
  );
}
