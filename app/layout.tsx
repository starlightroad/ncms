import type { Metadata } from 'next';
import fonts from '@/app/ui/fonts';
import '@/app/ui/globals.css';
import Navbar from '@/app/ui/navbar';

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
    <html lang="en">
      <body className={`${fonts.inter.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
