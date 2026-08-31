import type { NextFunction, Request, Response } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { AppError } from "../utils/app-error";

export const notFound = (
  req: Request,
  _res: Response,
  next: NextFunction
) => next(new AppError(404, `Route not found: ${req.method} ${req.originalUrl}`));

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  if (error instanceof UniqueConstraintError) {
    return res.status(409).json({ error: "Duplicated value" });
  }

  if (error instanceof ValidationError) {
    return res.status(400).json({ error: error.message });
  }

  console.error(error);
  return res.status(500).json({ error: "Internal server error" });
};
