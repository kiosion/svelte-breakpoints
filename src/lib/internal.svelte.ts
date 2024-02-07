import { get, readable } from 'svelte/store';

import type { QueryKey, BreakpointQueries } from '$lib/types';

export const DEFAULT_BREAKPOINT_SIZES = {
  sm: '(min-width: 0px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  xl2: '(min-width: 1536px)'
} as const;

const useMediaQuery = (query: string) => {
  if (typeof window === 'undefined' || !query) {
    return readable(false);
  }

  return readable(false, (set) => {
    const m = window.matchMedia(query);

    set(m.matches);

    const mql = (e: { matches: boolean }) => set(e.matches);
    m.addEventListener('change', mql);

    return () => m.removeEventListener('change', mql);
  });
};

const subscribeToQueries = (queries: BreakpointQueries) => {
  // TODO: This probably isn't needed
  // need to write test to see if providing `queries` then updating the queries object works as expected
  const queryStores = $derived(
    Object.entries(queries).reduce(
      (
        acc: Record<QueryKey, ReturnType<typeof useMediaQuery>>,
        [key, query]
      ) => {
        return query ? { ...acc, [key]: useMediaQuery(query) } : acc;
      },
      {}
    )
  );

  return readable<QueryKey[]>([], (set) => {
    const updateMatch = () =>
      set(
        Object.entries(queryStores)
          .filter(([_, store]) => get(store))
          .map(([name]) => name)
      );

    const unsubscribers = Object.values(queryStores).map((store) =>
      store.subscribe(updateMatch)
    );

    return () => unsubscribers.forEach((fn) => fn());
  });
};

export { subscribeToQueries, useMediaQuery };
