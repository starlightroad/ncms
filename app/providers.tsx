'use client';

import MapProvider from '@/app/providers/map-provider';
import { ThemeProvider } from '@/app/providers/theme-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MapProvider>{children}</MapProvider>
    </ThemeProvider>
  );
}
