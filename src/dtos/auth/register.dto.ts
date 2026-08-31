import type { Role } from "../../types/auth.types";

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role?: Role;
}
