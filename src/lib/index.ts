import Breakpoints from '$lib/Breakpoints.svelte';
import { useMediaQuery } from '$lib/internal';

import type { BreakpointQueries, BreakpointMatch } from '$lib/types';

export {
  Breakpoints as default,
  useMediaQuery,
  type BreakpointQueries,
  type BreakpointMatch
};
