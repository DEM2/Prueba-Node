import type { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";

const service = new UserService();

export class UserController {
  static async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await service.list();
      res.status(200).json({ data: users });
    } catch (error) {
      next(error);
    }
  }
}
