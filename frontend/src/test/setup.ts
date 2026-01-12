import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll, beforeEach } from "vitest";
import { server } from "./msw/server";
import { cleanup } from "@testing-library/react";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

beforeAll(() => {
  server.listen();
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock
  });
});

beforeEach(() => {
  localStorageMock.clear();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
  localStorageMock.clear();
});

afterAll(() => server.close());
