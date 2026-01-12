import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/login.page";
import { PokemonsPage } from "../pages/pokemons.page";
import { PokemonDetailPage } from "../pages/pokemon-detail.page";
import { ProtectedRoute } from "./protected-route";
import { makeLoginUseCase } from "../../infra/factories/login-usecase.factory";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <LoginPage loginUseCase={makeLoginUseCase()} /> },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { path: "/pokemons", element: <PokemonsPage /> },
      { path: "/pokemons/:id", element: <PokemonDetailPage /> }
    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
