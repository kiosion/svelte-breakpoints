<script lang="ts">
  import { get, readable, type Readable } from 'svelte/store';
  import type { BreakpointQueries, BreakpointMatch } from './types';
  import { useMediaQuery as mediaQueryFn } from './utils';

  const useMediaQuery = mediaQueryFn.bind(this);

  export let queries: BreakpointQueries | undefined;

  const queryStores = Object.entries(queries).reduce(
      (acc: Record<string, Readable<boolean>>, [key, query]) => {
        const store = useMediaQuery(query);
        acc[key] = store;
        return acc;
      },
      {} as Record<string, Readable<boolean>>
    ),
    slotToUse = (match: BreakpointMatch) => {
      let slot: string | undefined;
      ['xl', 'lg', 'md', 'sm'].forEach((key) => {
        if (slot) {
          return;
        }
        if (match === key && !!$$slots[key]) {
          slot = key;
        }
      });
      return slot ?? 'default';
    };

  export const match = readable<BreakpointMatch>(undefined, (set) => {
    const updateMatch = () => {
        const matches = Object.entries(queryStores).reduce(
            (acc, [key, store]) => {
              acc[key] = get(store);
              return acc;
            },
            {} as Record<string, boolean>
          ),
          breakpoint = Object.entries(matches).reduce((acc, [key, value]) => {
            if (value) {
              acc = key;
            }
            return acc;
          }, undefined as string | undefined);
        set(breakpoint as BreakpointMatch);
      },
      unsubscribe = Object.values(queryStores).map((store) =>
        store.subscribe(updateMatch)
      );
    return () => unsubscribe.forEach((fn) => fn());
  });

  $: slot = slotToUse($match);
</script>

{#if slot === 'xl'}
  <slot name="xl" />
{:else if slot === 'lg'}
  <slot name="lg" />
{:else if slot === 'md'}
  <slot name="md" />
{:else if slot === 'sm'}
  <slot name="sm" />
{:else if slot === 'default'}
  <slot />
{/if}
