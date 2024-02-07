# svelte-breakpoints
Svelte component and helper function for creating easy dynamic layouts with CSS media queries.

> [!Important]
> Since this package relies on CSS Media Query Listeners, content outside the Default slot is *not* rendered server-side. If you need conditional layouts based on screen sizes, and need SSR compatibility, use CSS `@media` queries in your styles instead.

> [!Note]
> v1.0 is currently in progress, and includes a rewrite of the component and helper function for use with Svelte v5's Runes. The current version is still available in the [`v0` branch](https://github.com/kiosion/svelte-breakpoints/tree/v0).

## Installation
Install using yarn / pnpm / npm:

```bash
yarn add -D svelte-breakpoints
```
```bash
pnpm add -D svelte-breakpoints
```
```bash
npm install --save-dev svelte-breakpoints
```

## Usage
### Helpers
Import `useMediaQuery` and provide a valid CSS media query. It will return a readable boolean store representing whether the media query matches.

```html
<script lang="ts">
  import { useMediaQuery } from 'svelte-breakpoints';

  const isMobile: Readable<boolean> = useMediaQuery('(max-width: 600px)');

  $effect(() => {
    if ($isMobile) {
      console.log('Not desktop!');
    }
  });
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

`subscribeToQueries` allows subscribing to the state of multiple MQLs, as well as updating them after the initial function call. It returns a Readable store containing the names of all matching queries in an array.

```html
<script lang="ts">
  import { subscribeToQueries } from 'svelte-breakpoints';

  const mediaQueries = {
    reduceMotion: '(prefers-reduced-motion: reduce)',
    prefersDark: '(prefers-color-scheme: dark)'
  };

  const matches: Readable<string[]> = subscribeToQueries(mediaQueries);

  $effect(() => {
    if (matches.includes('reduceMotion')) {
      console.log('Reduced motion is enabled');
    }
  });
</script>
```

### Component
Import the component and pass in the media queries to use. By default, the component will only render the last matching snippet, or the default Slot if no queries match or no snippets are provided. Providing `renderAll` will render all matching snippets.

```html
<script lang="ts">
  import Breakpoints from 'svelte-breakpoints';

  const mediaQueries = {
    small: '(min-width: 0px)',
    medium: '(min-width: 768px)',
    large: '(min-width: 1024px)',
  };
</script>

<!-- Using snippets as children -->
<Breakpoints queries={mediaQueries}>
  {#snippet small()}
    <p>Screen is at least 1024px wide</p>
  {/snippet}
  {#snippet medium()}
    <p>Screen is at least 768px wide</p>
  {/snippet}
  {#snippet large()}
    <p>Screen is less than 768px wide</p>
  {/snippet}
</Breakpoints>

<!-- Rendering all matching snippets -->
<Breakpoints queries={mediaQueries} renderAll>
  {#snippet small()}
    <p>Screen is at least 1024px wide</p>
  {/snippet}
  {#snippet medium()}
    <p>Screen is at least 768px wide</p>
  {/snippet}
  {#snippet large()}
    <p>Screen is less than 768px wide</p>
  {/snippet}
</Breakpoints>
```

You can also define snippets elsewhere and pass them in via the `content` prop.

```html
{#snippet default()}
  <p>I'm defined elsewhere!</p>
{/snippet}
{#snippet small()}
  <p>I'm defined elsewhere too!</p>
{/snippet}

<!-- ... -->

<Breakpoints queries={mediaQueries} content={{ small, default }} />
```

Binding to `$matches` returns a Readable store containing the names of all matching queries.

```html
<Breakpoints queries={mediaQueries} let:$matches>
  {#if $matches.includes('large')}
    <p>Screen is at least 1024px wide</p>
  {:else}
    <p>Screen is less than 1024px wide</p>
  {/if}
</Breakpoints>
```

Since any valid CSS media queries can be used, you can also use queries such as `prefers-color-scheme`, `prefers-reduced-motion`, etc.

```html
<script lang="ts">
  import Breakpoints from 'svelte-breakpoints';

  const mediaQueries = {
    reducedMotion: '(prefers-reduced-motion: reduce)',
  };
</script>

<Breakpoints queries={mediaQueries}>
  {#snippet reducedMotion()}
    <p>Reduced motion is enabled</p>
  {/snippet}
  {#snippet default()}
    <p>Reduced motion is not enabled</p>
  {/snippet}
</Breakpoints>
```

## Development
To build the package, install deps with `pnpm install`, then run `pnpm build`. This will output the compiled files to the `dist` directory. To run the demo app, use `pnpm dev`.

### Testing
To run all Playwright and Vitest tests, use `pnpm test`.

## Issues
If you find any issues, please [open a new issue](https://github.com/kiosion/svelte-breakpoints/issues/new), or submit a pull request!

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
