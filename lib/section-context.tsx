'use client';

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';

interface SectionContextType {
  currentSection: number;
  setCurrentSection: Dispatch<SetStateAction<number>>;
}

const SectionContext = createContext<SectionContextType>({
  currentSection: 0,
  setCurrentSection: () => {},
});

export function SectionProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState(0);
  return (
    <SectionContext.Provider value={{ currentSection, setCurrentSection }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSectionNav() {
  return useContext(SectionContext);
}
