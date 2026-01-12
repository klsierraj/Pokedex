import type { AuthRepository } from "../ports/auth-repository";

export class LoginUseCase {
  authRepo: AuthRepository;

  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  async execute(params: { username: string; password: string }) {
    if (!params.username || !params.password) {
      throw new Error("Invalid credentials");
    }

    return this.authRepo.login(params.username, params.password);
  }
}