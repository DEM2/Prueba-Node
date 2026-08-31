import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

export const userRouter = Router();

/**
 * @openapi
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: List users (ADMIN only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User list without password hashes
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
userRouter.get("/", authenticate, authorize("ADMIN"), UserController.list);
