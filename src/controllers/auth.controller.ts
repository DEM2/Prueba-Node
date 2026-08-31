import type { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

const authService = new AuthService();
const userService = new UserService();

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({ message: "User registered", data: user });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body);
      res.status(200).json({ message: "Login successful", data: result });
    } catch (error) {
      next(error);
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getById(req.user!.sub);
      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  }
}
