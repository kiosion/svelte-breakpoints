import { describe, it, expect } from 'vitest';

describe('index', () => {
  it('exports expected members', async () => {
    const lib = await import('$lib');

    expect(lib.default).toBeDefined();
    expect(lib.subscribeToQueries).toBeDefined();
    expect(lib.useMediaQuery).toBeDefined();
  });
});
