import { readable } from 'svelte/store';

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
