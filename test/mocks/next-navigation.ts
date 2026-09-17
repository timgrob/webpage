import { vi } from "vitest";

/**
 * Shared next/navigation mock: components using the App Router's useRouter
 * (e.g. the homepage Terminal) throw "invariant expected app router to be
 * mounted" in jsdom without this. Registered globally via vitest.setup.ts;
 * tests that need to assert on navigation import `push` from here.
 */
export const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));
