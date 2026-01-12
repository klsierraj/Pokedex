import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginPage } from "./login.page";
import { LoginUseCase } from "../../core/application/use-cases/login.usecase";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useSessionStore } from "../../infra/state/session.store";
import { Token } from "../../core/domain/value-objects/token";
import { User } from "../../core/domain/models/user";

describe("LoginPage", () => {
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

    fireEvent.change(screen.getByTestId("username-input"), { target: { value: "admin" } });
    fireEvent.change(screen.getByTestId("password-input"), { target: { value: "admin" } });
    fireEvent.click(screen.getByTestId("login-button"));

    const pokemonsPage = await screen.findByTestId("pokemons-page");
    expect(pokemonsPage).toBeInTheDocument();

    const state = useSessionStore.getState();
    expect(state.user?.username).toBe("admin");
    expect(state.token?.value).toBe("abc");
  });
});
