import Navbar from '@/app/ui/navbar';
import Sidebar from '@/app/ui/sidebar';
import Container from '@/app/ui/container';
import Banner from '@/app/ui/banner';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="relative mt-14 w-full md:ml-56 md:max-w-[calc(100%-224px)]">
          <Banner />
          <Container>{children}</Container>
        </div>
      </div>
    </div>
  );
}
