import type { Metadata } from 'next';
import fonts from '@/app/ui/fonts';
import '@/app/ui/globals.css';
import Navbar from '@/app/ui/navbar';
import Sidebar from './ui/sidebar';

export const metadata: Metadata = {
  title: {
    template: '%s - NCMS',
    default: 'NCMS',
  },
  description: 'Network Circuit Management System',
};

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
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
