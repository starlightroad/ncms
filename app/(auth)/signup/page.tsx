import Link from 'next/link';
import SignUpForm from '@/app/ui/auth/signup-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/ui/card';

function AccountText() {
  return (
    <div className="mt-3 flex items-center justify-center text-center">
      <span className="text-sm text-muted-foreground">
        Have an account?&nbsp;
        <Link href="/signin" className="font-medium text-primary">
          Sign in
        </Link>
        .
      </span>
    </div>
  );
}

export default async function SignUp() {
  return (
    <main>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Sign up for an NCMS to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
          <AccountText />
        </CardContent>
      </Card>
    </main>
  );
}
