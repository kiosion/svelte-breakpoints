<script lang="ts">
  import { readable } from 'svelte/store';

  import { DEFAULT_BREAKPOINT_SIZES, subscribeToQueries } from '$lib/internal.svelte';

  import type { Snippet } from 'svelte';
  import type { Readable } from 'svelte/store';
  import type { BreakpointQueries, QueryKey } from '$lib/types';

  type Props = {
    [key: Exclude<
      QueryKey,
      'queries' |
      'content' |
      'match' |
      'renderAll' |
      'children' |
      'fallback'
    >]: Snippet<[(string | number)[]]> | unknown;
    fallback?: Snippet<[(string | number)[]]>;
    children?: Snippet<[(string | number)[]]>;
    content?: Record<QueryKey, Snippet<[(string | number)[]]>>;
    queries?: BreakpointQueries;
    matches?: Readable<(string | number)[]>;
    renderAll?: boolean;
  };

  let { queries, renderAll = false, content = undefined, ...restProps }: Props = $props();

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
      const snippet = (restProps as Record<QueryKey, Snippet<[(string | number)[]]>>)[name] || content?.[name];

      if (typeof snippet === 'function') {
        return [name, snippet];
      }
    }).filter((i) => !!i?.[1]) as ([QueryKey, Snippet<[(string | number)[]]>])[];

    return renderAll ? arr : arr.slice(arr.length - 1);
  });

  const fallback = $derived(typeof restProps?.fallback === 'function' ? restProps.fallback : typeof content?.fallback === 'function' ? content.fallback : typeof restProps?.children === 'function' ? restProps.children : undefined);

  export const matches = readable<(string | number)[]>([], (set) =>
    internal_matches.subscribe((v) => set(v))
  );
</script>

<svelte:options runes={true} />

{#if snippets.length}
  {#each snippets as [_, snippet]}
    {@render snippet($matches)}
  {/each}
{:else if fallback}
  {@render fallback($matches)}
{/if}
