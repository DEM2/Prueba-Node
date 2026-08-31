import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { verifyToken } from "../utils/jwt";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      throw new AppError(401, "Missing or invalid authorization header");
    }

    const token = header.slice(7);
    req.user = verifyToken(token);
    next();
  } catch {
    next(new AppError(401, "Invalid or expired token"));
  }
};
