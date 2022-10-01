<script lang="ts">
  import type { BreakpointQueries } from './types';
  import { useMediaQuery } from './utils';

  export const queries: BreakpointQueries = {
    sm: '(min-width: 0px)',
    lg: '(min-width: 768px)'
  };

  export let match: undefined | 'sm' | 'md' | 'lg' | 'xl' = undefined;

  const sm = useMediaQuery(queries.sm);
  const md = useMediaQuery(queries.md);
  const lg = useMediaQuery(queries.lg);
  const xl = useMediaQuery(queries.xl);

  $: if ($xl) {
    match = 'xl';
  } else if ($lg) {
    match = 'lg';
  } else if ($md) {
    match = 'md';
  } else if ($sm) {
    match = 'sm';
  } else {
    match = undefined;
  }
</script>

{#if $$slots.default}
  <slot />
{:else}
  {#if match === 'xl'}
    <slot name="xl" />
  {:else if match === 'lg'}
    <slot name="lg" />
  {:else if match === 'md'}
    <slot name="md" />
  {:else if match === 'sm'}
    <slot name="sm" />
  {/if}
{/if}
