'use client';

import MapProvider from '@/app/ui/dashboard/provider';
import DialogProvider from '@/app/ui/dialog-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DialogProvider>
      <MapProvider>{children}</MapProvider>;
    </DialogProvider>
  );
}
