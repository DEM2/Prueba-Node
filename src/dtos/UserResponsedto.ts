import type { Role } from "../types/auth.types";

export interface UserResponseDto {
  id: number;
  name: string;
  email: string;
  role: Role;
}
