'use client';

import { type ReactNode } from 'react';
import { BackgroundPaletteProvider } from '@/lib/background-palette-context';
import { SectionProvider } from '@/lib/section-context';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SectionProvider>
      <BackgroundPaletteProvider>{children}</BackgroundPaletteProvider>
    </SectionProvider>
  );
}
