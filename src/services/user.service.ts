import { UserRepository } from "../repositories/user.repository";
import type { UserResponseDto } from "../dtos/UserResponsedto";
import { AppError } from "../utils/app-error";

export class UserService {
  constructor(private readonly users = new UserRepository()) {}

  async getById(id: number): Promise<UserResponseDto> {
    const user = await this.users.findById(id);

    if (!user) {
      throw new AppError(404, "User not found");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }

  async list(): Promise<UserResponseDto[]> {
    const users = await this.users.findAllSafe();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }));
  }
}
