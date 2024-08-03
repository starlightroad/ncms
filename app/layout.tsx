import type { Metadata } from 'next';
import fonts from '@/app/ui/fonts';
import '@/app/ui/globals.css';
import Navbar from '@/app/ui/navbar';
import Sidebar from '@/app/ui/sidebar';
import Container from '@/app/ui/container';

export const metadata: Metadata = {
  title: {
    template: '%s - NCMS',
    default: 'NCMS',
  },
  description: 'Network Circuit Management System',
};

function Banner() {
  return (
    <div className="absolute left-0 top-0 -z-10 h-40 w-full border-b bg-gray-50 bg-opacity-30"></div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${fonts.inter.className} h-full antialiased`}>
        <div className="h-full w-full overflow-clip">
          <Navbar />
          <div className="flex h-full">
            <Sidebar />
            <div className="relative w-full pt-16">
              <Banner />
              <Container>{children}</Container>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
