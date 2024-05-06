<script lang="ts">
  import { readable } from 'svelte/store';

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

  let QUERIES = $state<BreakpointQueries>(queries ?? DEFAULT_BREAKPOINT_SIZES);

  $effect(() => {
    if (queries) {
      QUERIES = queries;
    }
  });

  const internal_matches = $derived<Readable<(keyof BreakpointQueries)[]>>(subscribeToQueries(QUERIES));

  const snippets = $derived.by(() => {
    if (
      !$internal_matches?.length ||
      (!restProps && !content) ||
      typeof restProps !== 'object' ||
      (typeof restProps !== 'object' && typeof content !== 'object')
    ) {
      return [];
    }

    const arr = $internal_matches.map((name) => {
      const snippet = (restProps as Record<QueryKey, Snippet>)[name] || content?.[name];

      if (typeof snippet === 'function') {
        return [name, snippet];
      }
    }).filter((i) => !!i?.[1]) as ([QueryKey, Snippet])[];

    return renderAll ? arr : arr.slice(arr.length - 1);
  });

  const fallback = $derived(typeof restProps?.default === 'function' ? restProps.default : typeof content?.default === 'function' ? content.default : undefined);

  export const matches = readable<(string | number)[]>([], (set) =>
    internal_matches.subscribe((v) => set(v))
  );
</script>

<svelte:options runes={true} />

{#if snippets.length}
  {#each snippets as [_, snippet]}
    {@render snippet()}
  {/each}
{:else if fallback}
  {@render fallback()}
{:else if $$slots.default}
  <!-- Fall back to default slot -->
  <slot $matches={$matches} />
{/if}
