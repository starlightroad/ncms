import type { Metadata } from 'next';
import fonts from '@/app/ui/fonts';
import '@/app/ui/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Providers from '@/app/providers';

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
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${fonts.inter.className} h-full antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
