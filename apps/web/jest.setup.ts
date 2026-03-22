import '@testing-library/jest-dom';

// Framer Motion uses IntersectionObserver (whileInView) — not available in jsdom
const mockIntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});
