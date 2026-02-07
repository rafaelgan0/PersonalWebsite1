'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { PALETTE as DEFAULT_PALETTE } from '@/lib/palette';

interface BackgroundPaletteCtx {
  palette: string[];
  setPalette: (colors: string[]) => void;
  resetPalette: () => void;
}

const Ctx = createContext<BackgroundPaletteCtx>({
  palette: DEFAULT_PALETTE,
  setPalette: () => {},
  resetPalette: () => {},
});

export function BackgroundPaletteProvider({ children }: { children: ReactNode }) {
  const [palette, _setPalette] = useState<string[]>(DEFAULT_PALETTE);

  const setPalette = useCallback((colors: string[]) => {
    _setPalette(colors.length > 0 ? colors : DEFAULT_PALETTE);
  }, []);

  const resetPalette = useCallback(() => {
    _setPalette(DEFAULT_PALETTE);
  }, []);

  return (
    <Ctx.Provider value={{ palette, setPalette, resetPalette }}>
      {children}
    </Ctx.Provider>
  );
}

export function useBackgroundPalette() {
  return useContext(Ctx);
}
