import type { Metadata } from 'next';
import fonts from '@/app/ui/fonts';
import '@/app/ui/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Navbar from '@/app/ui/navbar';
import Sidebar from '@/app/ui/sidebar';
import Container from '@/app/ui/container';
import Providers from '@/app/providers';

export const metadata: Metadata = {
  title: {
    template: '%s - NCMS',
    default: 'NCMS',
  },
  description: 'Network Circuit Management System',
};

function Banner() {
  return (
    <div className="absolute left-0 top-0 -z-10 h-32 w-full border-b bg-primary-foreground bg-opacity-30 lg:h-40"></div>
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
        <Providers>
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
        </Providers>
      </body>
    </html>
  );
}
