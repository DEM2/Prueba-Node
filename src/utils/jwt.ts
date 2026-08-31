import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import type { JwtPayload as AppJwtPayload } from "../types/auth.types";

export const signToken = (payload: AppJwtPayload): string =>
  jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn as SignOptions["expiresIn"]
  });

export const verifyToken = (token: string): AppJwtPayload => {
  const decoded = jwt.verify(token, env.jwt.secret);

  if (typeof decoded === "string") {
    throw new Error("Invalid token payload");
  }

  return {
    sub: Number(decoded.sub),
    email: String(decoded.email),
    role: decoded.role as AppJwtPayload["role"]
  };
};