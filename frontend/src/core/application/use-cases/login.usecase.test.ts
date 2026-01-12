import { describe, expect, it, vi } from "vitest";
import { LoginUseCase } from "./login.usecase";
import { Credentials } from "../../domain/value-objects/credentials";
import { Token } from "../../domain/value-objects/token";
import { User } from "../../domain/models/user";

describe("LoginUseCase", () => {
  it("should throw if credentials are invalid", async () => {
    const repo = { login: vi.fn() };
    const useCase = new LoginUseCase(repo as any);
    const creds = new Credentials("", "");

    await expect(useCase.execute(creds)).rejects.toThrow("Invalid credentials");
  });

  it("should return token and user on success", async () => {
    const mockUser = new User("admin");
    const mockToken = new Token("123");
    const repo = {
      login: vi.fn().mockResolvedValue({ token: mockToken, user: mockUser })
    };

    const useCase = new LoginUseCase(repo as any);
    const creds = new Credentials("admin", "admin");

    const result = await useCase.execute(creds);

    expect(repo.login).toHaveBeenCalledWith("admin", "admin");
    expect(result.user.username).toBe("admin");
    expect(result.token.value).toBe("123");
  });
});
