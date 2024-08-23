import { auth } from '@/auth';
import Link from 'next/link';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import { Button } from '@/app/ui/button';
import Container from '@/app/ui/container';

function Buttons() {
  return (
    <>
      <Button size="sm" asChild>
        <Link href="/signin">Sign In</Link>
      </Button>
      <Button variant="secondary" size="sm">
        <Link href="signup">Sign Up</Link>
      </Button>
    </>
  );
}

function SignedInButtons({ companyName }: { companyName: string }) {
  return (
    <>
      <Button size="sm" asChild>
        <Link href={`/${companyName}`}>Go to Dashboard</Link>
      </Button>
      <Button variant="secondary" size="sm">
        Sign Out
      </Button>
    </>
  );
}

export default async function Home() {
  const session = await auth();
  const isSignedIn = !!session?.user;
  const companyName = 'acme-networks';

  return (
    <Container>
      <main className="w-full py-8 text-center lg:pt-16">
        <PageHeader>
          <PageHeading>NCMS</PageHeading>
          <p className="text-muted-foreground">
            Network circuit management system. Built with Next.js.
          </p>
        </PageHeader>
        <div className="flex flex-col justify-center gap-3 md:flex-row">
          {isSignedIn ? <SignedInButtons companyName={companyName} /> : <Buttons />}
        </div>
      </main>
    </Container>
  );
}
