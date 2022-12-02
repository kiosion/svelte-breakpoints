<script lang="ts">
  import type { BreakpointQueries } from './types';
  import { useMediaQuery as mediaQueryFn } from './utils';

  const useMediaQuery = mediaQueryFn.bind(null);

  export const queries: BreakpointQueries = {
    sm: '(min-width: 0px)',
    lg: '(min-width: 768px)'
  };

  export let match: undefined | 'sm' | 'md' | 'lg' | 'xl' = undefined;

  const sm = useMediaQuery(queries.sm);
  const md = useMediaQuery(queries.md);
  const lg = useMediaQuery(queries.lg);
  const xl = useMediaQuery(queries.xl);

  const slotToUse = (match) => {
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

  $: match = (() => {
    if (xl) {
      return 'xl';
    }
    if (lg) {
      return 'lg';
    }
    if (md) {
      return 'md';
    }
    if (sm) {
      return 'sm';
    }
    return undefined;
  })();
  $: slot = slotToUse(match);
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
