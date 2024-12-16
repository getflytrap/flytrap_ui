import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

global.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false, // Default: query does not match (you can change this if needed)
  media: query,
  addListener: vi.fn(), // Deprecated, for older APIs
  removeListener: vi.fn(), // Deprecated, for older APIs
}));

afterEach(() => {
  cleanup();
});
