# svelte-breakpoints
Svelte component and helper function for creating dynamic layouts based on CSS media queries. 

## Installation
Install using yarn or npm:

```bash
yarn add -D svelte-breakpoints
```

## Usage
### Helper
Import `useMediaQuery` from 'svelte-breakpoints' and pass it a valid CSS media query. It will return a readable store you can subscribe to, which will be true when the query matches.

```ts
import { useMediaQuery } from 'svelte-breakpoints';

const isMobile = useMediaQuery('(max-width: 600px)');

$: if ($isMobile) {
  // do something
}
```

### Component
Import the component and pass in the media queries to use. You can use either the default "sm"/"md"/"lg"/"xl" slots, or bind a variable to the "matches" prop.

```html
<script lang="ts">
  import Breakpoints from 'svelte-breakpoints';

  const mediaQueries = {
    sm: '(min-width: 0px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
  };

  let match: string | undefined;
</script>

<!-- Using named slots -->
<Breakpoints queries={mediaQueries}>
  <svelte:fragment slot="lg">
    <p>Screen is at least 1024px wide</p>
  </svelte:fragment>
  <svelte:fragment slot="md">
    <p>Screen is at least 768px wide</p>
  </svelte:fragment>
  <svelte:fragment slot="sm">
    <p>Screen is less than 768px wide</p>
  </svelte:fragment>
</Breakpoints>

<!-- Binding to "match" -->
<Breakpoints queries={mediaQueries} bind:match>
  {#if match === 'lg'}
    <p>Screen is at least 1024px wide</p>
  {:else}
    <p>Screen is less than 1024px wide</p>
  {/if}
</Breakpoints>
```
