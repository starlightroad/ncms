import Banner from '@/app/ui/banner';
import Container from '@/app/ui/container';

function AuthContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full justify-center pt-[88px] lg:pt-[120px]">{children}</div>;
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Banner />
      <AuthContainer>{children}</AuthContainer>
    </Container>
  );
}
