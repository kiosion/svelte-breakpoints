import Breakpoints from './Breakpoints.svelte';
import { useMediaQuery as mediaQueryFn } from './utils';

const useMediaQuery = mediaQueryFn.bind(null);
export { Breakpoints as default, useMediaQuery };
