import type { Readable } from 'svelte/store';

export type QueryKey = string;

export type BreakpointQueries = {
  [key: QueryKey]: string;
};

export type BreakpointMatch = Readable<QueryKey | undefined>;
