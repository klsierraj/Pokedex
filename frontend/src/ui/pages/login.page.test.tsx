import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginPage } from "./login.page";
import { LoginUseCase } from "../../core/application/use-cases/login.usecase";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { loadSession, clearSession } from "../../auth";
import { Token } from "../../core/domain/value-objects/token";
import { User } from "../../core/domain/models/user";

describe("LoginPage", () => {
  beforeEach(() => {
    clearSession();
  });

  afterEach(() => {
    clearSession();
  });

  it("should login and redirect to /pokemons", async () => {
    const mockUseCase = {
      execute: vi.fn().mockResolvedValue({
        token: new Token("abc"),
        user: new User("admin")
      })
    } as unknown as LoginUseCase;

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<LoginPage loginUseCase={mockUseCase} />} />
          <Route path="/pokemons" element={<div data-testid="pokemons-page" />} />
        </Routes>
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin" } });
    fireEvent.click(submitButton);

    const pokemonsPage = await screen.findByTestId("pokemons-page");
    expect(pokemonsPage).toBeInTheDocument();

    const session = loadSession();
    expect(session?.username).toBe("admin");
    expect(session?.token).toBe("abc");
  });
});
