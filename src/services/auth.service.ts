import { UserRepository } from "../repositories/user.repository";
import type { RegisterDto } from "../dtos/auth/register.dto";
import type { LoginDto } from "../dtos/auth/login.dto";
import type { UserResponseDto } from "../dtos/UserResponsedto";
import { AppError } from "../utils/app-error";
import { comparePassword, hashPassword } from "../utils/password";
import { signToken } from "../utils/jwt";
import {
  assertEmail,
  assertPassword,
  assertRequiredString
} from "../utils/validators";
import type { Role } from "../types/auth.types";

const validRoles: Role[] = ["ADMIN", "GESTOR"];

export class AuthService {
  constructor(private readonly users = new UserRepository()) {}

  async register(input: RegisterDto): Promise<UserResponseDto> {
    assertRequiredString(input.name, "name");
    assertEmail(input.email);
    assertPassword(input.password);

    const requestedRole = (input.role ?? "GESTOR") as Role;
    if (!validRoles.includes(requestedRole)) {
      throw new AppError(400, "Role must be one of: ADMIN, GESTOR");
    }

    const email = input.email.trim().toLowerCase();
    const existing = await this.users.findByEmail(email);

    if (existing) {
      throw new AppError(409, "Email already registered");
    }

    const password = await hashPassword(input.password);

    const user = await this.users.create({
      name: input.name.trim(),
      email,
      password,
      role: requestedRole
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }

  async login(input: LoginDto) {
    assertEmail(input.email);
    assertRequiredString(input.password, "password");

    const email = input.email.trim().toLowerCase();
    const user = await this.users.findByEmail(email);

    if (!user) {
      throw new AppError(401, "Invalid credentials");
    }

    const valid = await comparePassword(input.password, user.password);

    if (!valid) {
      throw new AppError(401, "Invalid credentials");
    }

    const token = signToken({
      sub: user.id,
      email: user.email,
      role: user.role
    });

    const safeUser: UserResponseDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    return {
      token,
      user: safeUser
    };
  }
}
