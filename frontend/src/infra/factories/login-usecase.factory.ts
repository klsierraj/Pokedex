import { LoginUseCase } from "../../core/application/use-cases/login.usecase";
import { AuthHttpRepository } from "../http/auth-http.repository";

export function makeLoginUseCase() {
  const repo = new AuthHttpRepository();
  const useCase = new LoginUseCase(repo);
  return useCase;
}
