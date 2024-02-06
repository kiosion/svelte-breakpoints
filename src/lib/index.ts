import Breakpoints from '$lib/Breakpoints.svelte';
import { useMediaQuery } from '$lib/utils';
import type { BreakpointQueries, ExtBreakpointMatch } from '$lib/types';

export {
  Breakpoints as default,
  useMediaQuery,
  type BreakpointQueries,
  type ExtBreakpointMatch as BreakpointMatch
};
