import type { Readable } from 'svelte/store';
import { DEFAULT_BREAKPOINT_SIZES } from '$lib/utils';

export type BreakpointQueries = {
  [key in typeof DEFAULT_BREAKPOINT_SIZES[number]]?: string;
};

export type BreakpointMatch = 'sm' | 'md' | 'lg' | 'xl' | undefined;
export type ExtBreakpointMatch = Readable<BreakpointMatch>;
