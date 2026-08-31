import type { NextFunction, Request, Response } from "express";
import type { Role } from "../types/auth.types";
import { AppError } from "../utils/app-error";

export const authorize = (...allowedRoles: Role[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError(401, "Unauthenticated"));
    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError(403, "Forbidden"));
    }
    next();
  };
