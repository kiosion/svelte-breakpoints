<script lang="ts">
  import { useMediaQuery } from '$lib';

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
</script>

<svelte:options runes={true} />

<svelte:head>
  <title>useMediaQuery</title>
  <meta name="description" content="svelte-breakpoints demo app" />
</svelte:head>

<section class:dark={$prefersDarkMode}>
  <h1><span class="code">useMediaQuery</span> demo</h1>

  <div>
    <h2>The current color scheme is: <strong>{#if $prefersDarkMode}<span class="dark">dark</span>{:else}<span class="light">light</span>{/if}</strong></h2>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: #f5f5f5;
    color: #202020;
    transition: all 300ms ease;
  }

  section.dark {
    background-color: #333;
    color: #f1f1f1;
  }

  h1, h2 {
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

  .code {
    font-family: monospace;
    background-color: #f0f0f0;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
  }

  .dark .code {
    background-color: #1d1d1d;
    color: #f1f1f1;
  }
</style>