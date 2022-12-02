<script>
  import welcome from '$lib/images/svelte-welcome.webp';
  import welcome_fallback from '$lib/images/svelte-welcome.png';
  import Breakpoints from 'svelte-breakpoints';

  const mediaQueries = {
    sm: '(min-width: 0px)',
    md: '(min-width: 640px)',
    lg: '(min-width: 768px)',
    xl: '(min-width: 1024px)',
  };

  /** @type {import('svelte-breakpoints').BreakpointMatch} */
  let match;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <h1>
    <span class="welcome">
      <picture>
        <source srcset={welcome} type="image/webp" />
        <img src={welcome_fallback} alt="Welcome" />
      </picture>
    </span>
  </h1>

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
    <h2>And here it is as a string, from binding to the store: {$match}</h2>
  </Breakpoints>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }

  h1 {
    width: 100%;
  }

  .welcome {
    display: block;
    position: relative;
    width: 100%;
    height: 0;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }

  .welcome img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: block;
  }
</style>
