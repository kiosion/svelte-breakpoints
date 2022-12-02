import type { Readable } from 'svelte/store';

export interface BreakpointQueries {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

export type BreakpointMatch = 'sm' | 'md' | 'lg' | 'xl' | undefined;
export type ExtBreakpointMatch = Readable<BreakpointMatch>;
