# svelte-breakpoints
Svelte component and helper function for creating easy dynamic layouts with CSS media queries.

## Installation
Install using yarn or npm:

```bash
$ yarn add -D svelte-breakpoints
```
```bash
$ npm install --save-dev svelte-breakpoints
```

## Usage
### Helper
Import `useMediaQuery` and pass in a valid CSS media query. It will return a readable store which will represent whether the media query matches or not as a boolean.

```html
<script>
  ...
  import { useMediaQuery } from 'svelte-breakpoints';

  const isMobile = useMediaQuery('(max-width: 600px)');
  // => Returns type Readable<boolean>

  $: if ($isMobile) {
    // do something
  }

</script>

{#if $isMobile}
  <!-- do something -->
{/if}
```

It can be used for any valid CSS media queries.

```ts
import { useMediaQuery } from 'svelte-breakpoints';

const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
```

### Component
Import the component and pass in the media queries to use. You can use either the default "sm"/"md"/"lg"/"xl" slots, or bind a variable to the "match" prop - this will return a readable store you can subscribe to, which will contain the name of the matching query, or `undefined` if none match.

When using slots, the component will render the highest matching slot (e.g., if the both 'sm' and 'lg' queries match, it will render the 'lg' slot). If no slots match, it will render the default slot.

```html
<script lang="ts">
  import Breakpoints from 'svelte-breakpoints';
  import type { BreakpointMatch } from 'svelte-breakpoints';

  const mediaQueries = {
    sm: '(min-width: 0px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
  };

  let match: BreakpointMatch;
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
  {#if $match === 'lg'}
    <p>Screen is at least 1024px wide</p>
  {:else}
    <p>Screen is less than 1024px wide</p>
  {/if}
</Breakpoints>
```

## Issues
If you find any issues, please [open a new issue](https://github.com/kiosion/svelte-breakpoints/issues/new), or submit a pull request!

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
