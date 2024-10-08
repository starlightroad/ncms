import { auth } from '@/auth';
import Link from 'next/link';
import PageHeader from '@/app/ui/page-header';
import PageHeading from '@/app/ui/page-heading';
import { Button } from '@/app/ui/button';
import Container from '@/app/ui/container';

function SignInAndSignUpButtons() {
  return (
    <>
      <Button size="sm" asChild>
        <Link href="/signin">Sign In</Link>
      </Button>
      <Button variant="secondary" size="sm" asChild>
        <Link href="signup">Sign Up</Link>
      </Button>
    </>
  );
}

function GoToDashboardButton() {
  return (
    <Button size="sm" asChild>
      <Link href="/dashboard">Go to Dashboard</Link>
    </Button>
  );
}

export default async function Home() {
  const session = await auth();
  const isSignedIn = !!session?.user;

  return (
    <Container>
      <main className="w-full py-8 text-center lg:pt-16">
        <PageHeader>
          <PageHeading>NCMS</PageHeading>
          <p className="text-muted-foreground">
            Network circuit management system. Built with Next.js.
          </p>
        </PageHeader>
        <nav className="flex flex-col justify-center gap-3 md:flex-row">
          {isSignedIn ? <GoToDashboardButton /> : <SignInAndSignUpButtons />}
        </nav>
      </main>
    </Container>
  );
}
