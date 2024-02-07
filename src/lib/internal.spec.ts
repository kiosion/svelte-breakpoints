import { tick } from 'svelte';
import { get } from 'svelte/store';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { useMediaQuery, subscribeToQueries } from '$lib/internal.svelte';

type MatchMediaMock = {
  triggerChange: (query: string, matches: boolean) => void;
};

type MediaQueryCallback = (e: MediaQueryListEvent) => void;

const mediaQueryStates: Record<string, boolean> = {};

const createMatchMediaMock = () => {
  const listeners: Record<string, MediaQueryCallback[]> = {};

  window.matchMedia = vi.fn().mockImplementation((query: string) => {
    const mql: MediaQueryList = {
      matches: mediaQueryStates[query] ?? false,
      media: query,
      onchange: null,
      // @ts-expect-error Type mismatch due to using actual MQL types
      addEventListener: (type: string, listener: MediaQueryCallback) => {
        if (!listeners[query]) {
          listeners[query] = [];
        }
        listeners[query].push(listener);
      },
      // @ts-expect-error Type mismatch due to using actual MQL types
      removeEventListener: (type: string, listener: MediaQueryCallback) => {
        const index = listeners[query]?.indexOf(listener) ?? -1;
        if (index > -1) {
          listeners[query].splice(index, 1);
        }
      },
      dispatchEvent: (_event: Event) => true // Placeholder impl
    };

    return mql;
  });

  const triggerChange = (query: string, matches: boolean) => {
    mediaQueryStates[query] = matches;

    // Notify all listeners for the query
    listeners[query]?.forEach((listener) =>
      listener({ matches, media: query } as MediaQueryListEvent)
    );
  };

  return { triggerChange };
};

describe('useMediaQuery', () => {
  let matchMediaMock: MatchMediaMock;

  beforeEach(() => {
    matchMediaMock = createMatchMediaMock();
  });

  it('should return a readable store', () => {
    const store = useMediaQuery('(min-width: 0px)');

    expect(store).toHaveProperty('subscribe');
  });

  it('should return a readable store that emits a boolean', () => {
    const store = useMediaQuery('(min-width: 0px)');

    expect(get(store)).toEqual(expect.any(Boolean));
  });

  it('responds to dynamic changes in media queries', async () => {
    const lightQuery = '(prefers-color-scheme: light)';
    const darkQuery = '(prefers-color-scheme: dark)';
    const storeLight = useMediaQuery(lightQuery);
    const storeDark = useMediaQuery(darkQuery);

    expect(get(storeLight)).toBe(false);
    expect(get(storeDark)).toBe(false);

    matchMediaMock.triggerChange(darkQuery, true);
    matchMediaMock.triggerChange(lightQuery, false);

    await tick();

    expect(get(storeLight)).toBe(false);
    expect(get(storeDark)).toBe(true);
  });
});

describe('subscribeToQueries', () => {
  let matchMediaMock: MatchMediaMock;

  beforeEach(() => {
    matchMediaMock = createMatchMediaMock();
  });

  it('initializes and reflects the current active queries', async () => {
    matchMediaMock.triggerChange('(min-width: 0px)', true); // need to do this explicitly since the default is false
    matchMediaMock.triggerChange('(min-width: 768px)', true);
    matchMediaMock.triggerChange('(min-width: 1024px)', false);

    const queries = {
      sm: '(min-width: 0px)',
      md: '(min-width: 768px)',
      lg: '(min-width: 1024px)'
    };

    const querySubscriptions = subscribeToQueries(queries);

    await tick();

    expect(get(querySubscriptions)).toEqual(['sm', 'md']);
  });

  it('updates subscribers when query matches change', async () => {
    matchMediaMock.triggerChange('(min-width: 768px)', false);
    matchMediaMock.triggerChange('(min-width: 1024px)', false);

    const queries = {
      md: '(min-width: 768px)',
      lg: '(min-width: 1024px)'
    };

    const querySubscriptions = subscribeToQueries(queries);

    await tick();

    matchMediaMock.triggerChange('(min-width: 1024px)', true);

    await tick();

    expect(get(querySubscriptions)).toEqual(['lg']);
  });
});
