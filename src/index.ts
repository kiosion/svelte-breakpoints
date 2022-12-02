import Breakpoints from './Breakpoints.svelte';
import { useMediaQuery } from './utils';
import type { BreakpointQueries, ExtBreakpointMatch } from './types';

export {
  Breakpoints as default,
  useMediaQuery,
  type BreakpointQueries,
  type ExtBreakpointMatch as BreakpointMatch
};
