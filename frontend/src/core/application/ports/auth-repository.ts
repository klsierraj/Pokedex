import { User } from "../../domain/models/user";
import { Token } from "../../domain/value-objects/token";

export interface AuthRepository {
  login(username: string, password: string): Promise<{ token: Token, user: User }>;
}
