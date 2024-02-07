<script lang="ts">
  import { DEFAULT_BREAKPOINT_SIZES, subscribeToQueries } from '$lib/internal.svelte';

  import type { Snippet } from 'svelte';
  import type { Readable } from 'svelte/store';
  import type { BreakpointQueries, QueryKey } from '$lib/types';

  type Props = {
    [key: Exclude<QueryKey, 'queries' | 'content' | 'match' | 'renderAll'>]: Snippet | unknown;
    content?: Record<QueryKey, Snippet>;
    queries?: BreakpointQueries;
    match?: Readable<QueryKey | undefined>;
    renderAll?: boolean;
  };

  let { queries, renderAll = false, content = undefined, ...restProps } = $props<Props>();

  // Fall back to default queries if none provided
  const QUERIES = $state(queries ?? DEFAULT_BREAKPOINT_SIZES);

  export const matches = $derived(subscribeToQueries(QUERIES));

  const snippets = $derived.call(() => {
    if (
      !$matches?.length ||
      (!restProps && !content) ||
      typeof restProps !== 'object' ||
      (typeof restProps !== 'object' && typeof content !== 'object')
    ) {
      return [];
    }

    const arr = $matches.map((name) => {
      // Need to assert restProps types in order to check if the snippet exists
      const snippet = (restProps as Record<QueryKey, Snippet>)[name] || content?.[name];

      if (typeof snippet === 'function') {
        return [name, snippet];
      }
    }).filter((i) => !!i?.[1]) as ([QueryKey, Snippet])[];

    return renderAll ? arr : arr.slice(arr.length - 1);
  });

  const fallback = $derived(typeof restProps?.default === 'function' ? restProps.default : typeof content?.default === 'function' ? content.default : undefined);
</script>

<svelte:options runes={true} />

{#if snippets.length}
  {#each snippets as [name, snippet]}
    <!-- TODO: Fix typing of this prop - for some reason `Snippet` only takes a generic of type `unknown[]`? -->
    {@render snippet(name)}
  {/each}
{:else if fallback}
    {@render fallback()}
{:else if $$slots.default}
<!-- Fall back to default slot -->
<slot {$matches} />
{/if}
