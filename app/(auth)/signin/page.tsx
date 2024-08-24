import Link from 'next/link';
import SignInForm from '@/app/ui/auth/signin-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/ui/card';

function NoAccountText() {
  return (
    <div className="mt-3 flex items-center justify-center text-center">
      <span className="text-sm text-muted-foreground">
        Don't have an account?&nbsp;
        <Link href="/signup" className="font-medium text-primary">
          Sign up
        </Link>
        .
      </span>
    </div>
  );
}

export default async function SignIn() {
  return (
    <main>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in to NCMS account to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
          <NoAccountText />
        </CardContent>
      </Card>
    </main>
  );
}
