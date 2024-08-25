import Link from 'next/link';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import { Button } from '@/app/ui/button';

export default function NotFound() {
  return (
    <main className="py-8 lg:py-16">
      <PageHeader>
        <PageHeading>404 Not Found</PageHeading>
      </PageHeader>
      <div className="space-y-3 rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">Could not find the requested vendor.</p>
        <Button size="sm" asChild>
          <Link href="/dashboard/vendors">Go to Vendors</Link>
        </Button>
      </div>
    </main>
  );
}
