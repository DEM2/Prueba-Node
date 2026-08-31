import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

export const authRouter = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register an account choosing ADMIN or GESTOR
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, role]
 *             properties:
 *               name: { type: string, example: "Usuario Prueba" }
 *               email: { type: string, format: email, example: "gestor@example.com" }
 *               password: { type: string, example: "Gestor123*" }
 *               role: { type: string, enum: ["ADMIN", "GESTOR"], example: "GESTOR" }
 *     responses:
 *       201:
 *         description: User registered
 *       409:
 *         description: Email already exists
 */
authRouter.post("/register", AuthController.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login and receive JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "admin@example.com" }
 *               password: { type: string, example: "Admin123*" }
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
authRouter.post("/login", AuthController.login);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user
 *       401:
 *         description: Unauthorized
 */
authRouter.get("/me", authenticate, AuthController.me);
