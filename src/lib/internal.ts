import { readable } from 'svelte/store';

export const DEFAULT_BREAKPOINT_SIZES = {
  sm: '(min-width: 0px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  xl2: '(min-width: 1536px)'
} as const;

export const useMediaQuery = (query: string) => {
  if (typeof window === 'undefined' || !query) {
    return readable(false);
  }

  const matches = readable(false, (set) => {
    const m = window.matchMedia(query);
    set(m.matches);
    const mql = (e: { matches: boolean }) => set(e.matches);
    m.addEventListener('change', mql);

    return () => {
      m.removeEventListener('change', mql);
    };
  });

  return matches;
};
