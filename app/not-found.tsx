import Link from 'next/link';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import { Button } from '@/app/ui/button';

export default function NotFound() {
  return (
    <main className="py-8 text-center lg:py-16">
      <PageHeader>
        <PageHeading>404 Not Found</PageHeading>
      </PageHeader>
      <div className="space-y-3 bg-card px-5">
        <p className="text-sm text-muted-foreground">Could not find the requested page.</p>
        <Button size="sm" asChild>
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </main>
  );
}
