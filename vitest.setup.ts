import '@testing-library/jest-dom';
import { beforeEach, afterEach, vi } from 'vitest';

beforeEach(() => {
  globalThis.fetch = vi.fn();
});

afterEach(() => {
  vi.resetAllMocks();
});
