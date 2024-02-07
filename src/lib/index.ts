import Breakpoints from '$lib/Breakpoints.svelte';
import { subscribeToQueries, useMediaQuery } from '$lib/internal.svelte';

import type { BreakpointQueries, BreakpointMatch } from '$lib/types';

export {
  Breakpoints as default,
  subscribeToQueries,
  useMediaQuery,
  type BreakpointQueries,
  type BreakpointMatch
};
