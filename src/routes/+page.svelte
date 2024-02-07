<script lang="ts">
  import Breakpoints from '$lib';
  import { DEFAULT_BREAKPOINT_SIZES } from '$lib/internal';
</script>

<svelte:options runes={true} />

<svelte:head>
  <title>svelte-breakpoints</title>
  <meta name="description" content="svelte-breakpoints demo app" />
</svelte:head>

<section>
  <h1><span class="code">svelte-breakpoints</span> demo</h1>

  <div>
    <h2>The current breakpoint is: <strong>
      <!-- Should be able to define snippets outside and pass them in as well -->
      {#snippet xl2()}
        <span>extra large 2</span>
      {/snippet}

      <Breakpoints queries={DEFAULT_BREAKPOINT_SIZES} content={{ xl2 }}>
        {#snippet sm()}
          <span>small</span>
        {/snippet}
        {#snippet md()}
          <span>medium</span>
        {/snippet}
        {#snippet lg()}
          <span>large</span>
        {/snippet}
        {#snippet xl()}
          <span>extra large</span>
        {/snippet}
        <span>unknown</span>
      </Breakpoints>
    </strong></h2>

    <Breakpoints queries={DEFAULT_BREAKPOINT_SIZES} let:$matches>
      <p>Here are all matching queries from binding to the store: {$matches.join(', ')}</p>
    </Breakpoints>

    <Breakpoints queries={{
      'dark': '(prefers-color-scheme: dark)',
      'light': '(prefers-color-scheme: light)',
    }}>
      {#snippet dark()}
        <p>This will only show when the preferred colour scheme is dark.</p>
      {/snippet}
      {#snippet light()}
        <p>This will only show when the preferred colour scheme is light.</p>
      {/snippet}
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

  h1, h2, p {
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

  p {
    font-size: 1rem;
    font-weight: 400;
  }

  .code {
    font-family: monospace;
    background-color: #f0f0f0;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
  }
</style>
