export type Role = "ADMIN" | "GESTOR";

export interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
}
