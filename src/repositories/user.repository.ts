import { User } from "../models/user.model";
import type { Role } from "../types/auth.types";

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export class UserRepository {
  findByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  findById(id: number) {
    return User.findByPk(id);
  }

  create(data: CreateUserData) {
    return User.create(data);
  }

  findAllSafe() {
    return User.findAll({
      attributes: { exclude: ["password"] },
      order: [["id", "ASC"]]
    });
  }
}
