<script lang="ts">
  import Breakpoints from '$lib';

  import type { BreakpointMatch, BreakpointQueries } from '$lib';

  const mediaQueries = {
    sm: '(min-width: 0px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 900px)',
    xl: '(min-width: 1200px)',
  } satisfies BreakpointQueries;

  let match: BreakpointMatch;
</script>

<svelte:head>
  <title>svelte-breakpoints</title>
  <meta name="description" content="svelte-breakpoints demo app" />
</svelte:head>

<section>
  <h1><span class="code">svelte-breakpoints</span> demo</h1>

  <div>
    <h2>The current breakpoint is: <strong>
      <Breakpoints queries={mediaQueries}>
        <svelte:fragment slot="sm">
          <span class="sm">small</span>
        </svelte:fragment>
        <svelte:fragment slot="md">
          <span class="md">medium</span>
        </svelte:fragment>
        <svelte:fragment slot="lg">
          <span class="lg">large</span>
        </svelte:fragment>
        <svelte:fragment slot="xl">
          <span class="xl">extra large</span>
        </svelte:fragment>
        <span>unknown</span>
      </Breakpoints>
    </strong></h2>

    <Breakpoints queries={mediaQueries} bind:match>
      <h3>And here it is as a string, from binding to the store: {$match}</h3>
    </Breakpoints>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  h1, h2, h3 {
    font-family: 'Inter', sans-serif;
    text-align: center;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;

  }

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 400;
  }

  .code {
    font-family: monospace;
    background-color: #f0f0f0;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
  }
</style>
