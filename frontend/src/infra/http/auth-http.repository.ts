import type { AuthRepository } from "../../core/application/ports/auth-repository";
import { Token } from "../../core/domain/value-objects/token";
import { User } from "../../core/domain/models/user";

export class AuthHttpRepository implements AuthRepository {
  async login(username: string, password: string) {
    const baseUrl = ""; // relativo → MSW en test, proxy Vite en dev

    const res = await fetch(`${baseUrl}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    const data = await res.json();
    const token = new Token(data.token);
    const user = new User(data.user.username);

    return { token: token, user: user };
  }
}
