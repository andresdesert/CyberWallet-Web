// Setup file for Vitest
import { expect, afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  // Cleanup logic if needed
});

// Mock global objects if needed
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];
  
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
};
