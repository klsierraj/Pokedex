import { describe, expect, it } from "vitest";
import { AuthHttpRepository } from "./auth-http.repository";
import { Token } from "../../core/domain/value-objects/token";
import { User } from "../../core/domain/models/user";

describe("AuthHttpRepository", () => {
  it("should return token and user when login succeeds", async () => {
    const repo = new AuthHttpRepository();
    const result = await repo.login("admin", "admin");

    expect(result.user).toBeInstanceOf(User);
    expect(result.token).toBeInstanceOf(Token);
    expect(result.user.username).toBe("admin");
    expect(result.token.value.length).toBeGreaterThan(0);
  });

  it("should throw on invalid credentials", async () => {
    const repo = new AuthHttpRepository();
    await expect(repo.login("bad", "creds")).rejects.toThrow("Login failed");
  });
});
