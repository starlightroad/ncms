'use client';

import MapProvider from '@/app/providers/map-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <MapProvider>{children}</MapProvider>;
}
