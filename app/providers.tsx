'use client';

import MapProvider from '@/app/ui/dashboard/provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <MapProvider>{children}</MapProvider>;
}
