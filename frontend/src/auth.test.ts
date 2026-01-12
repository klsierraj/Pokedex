import { describe, expect, it, beforeEach, afterEach } from "vitest";
import {
  saveSession,
  loadSession,
  clearSession,
  getToken,
  isAuthenticated,
  type AuthSession
} from "./auth";

describe("auth utilities", () => {
  beforeEach(() => {
    clearSession();
  });

  afterEach(() => {
    clearSession();
  });

  describe("saveSession", () => {
    it("should save session to localStorage", () => {
      const session: AuthSession = {
        token: "test-token-123",
        username: "testuser"
      };

      saveSession(session);
      const saved = loadSession();

      expect(saved).toEqual(session);
      expect(saved?.token).toBe("test-token-123");
      expect(saved?.username).toBe("testuser");
    });

    it("should overwrite existing session", () => {
      saveSession({ token: "token1", username: "user1" });
      saveSession({ token: "token2", username: "user2" });

      const saved = loadSession();
      expect(saved?.token).toBe("token2");
      expect(saved?.username).toBe("user2");
    });
  });

  describe("loadSession", () => {
    it("should return null when no session exists", () => {
      const session = loadSession();
      expect(session).toBeNull();
    });

    it("should return saved session", () => {
      const session: AuthSession = {
        token: "test-token",
        username: "testuser"
      };

      saveSession(session);
      const loaded = loadSession();

      expect(loaded).toEqual(session);
    });
  });

  describe("clearSession", () => {
    it("should remove session from localStorage", () => {
      saveSession({ token: "test-token", username: "testuser" });
      expect(loadSession()).not.toBeNull();

      clearSession();
      expect(loadSession()).toBeNull();
    });

    it("should not throw when clearing non-existent session", () => {
      expect(() => clearSession()).not.toThrow();
    });
  });

  describe("getToken", () => {
    it("should return empty string when no session exists", () => {
      const token = getToken();
      expect(token).toBe("");
    });

    it("should return token when session exists", () => {
      saveSession({ token: "test-token-123", username: "testuser" });
      const token = getToken();
      expect(token).toBe("test-token-123");
    });

    it("should return empty string after clearing session", () => {
      saveSession({ token: "test-token", username: "testuser" });
      clearSession();
      const token = getToken();
      expect(token).toBe("");
    });
  });

  describe("isAuthenticated", () => {
    it("should return false when no session exists", () => {
      expect(isAuthenticated()).toBe(false);
    });

    it("should return true when session exists", () => {
      saveSession({ token: "test-token", username: "testuser" });
      expect(isAuthenticated()).toBe(true);
    });

    it("should return false after clearing session", () => {
      saveSession({ token: "test-token", username: "testuser" });
      expect(isAuthenticated()).toBe(true);

      clearSession();
      expect(isAuthenticated()).toBe(false);
    });
  });
});
