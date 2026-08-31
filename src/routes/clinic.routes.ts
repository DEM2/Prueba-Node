import { Router } from "express";
import { ClinicController } from "../controllers/clinic.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

export const clinicRouter = Router();

clinicRouter.use(authenticate, authorize("ADMIN"));

/**
 * @swagger
 * /clinics:
 *   get:
 *     tags: [Clinics]
 *     summary: Listar clínicas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clínicas activas
 */
clinicRouter.get("/", ClinicController.list);

/**
 * @swagger
 * /clinics/{id}:
 *   get:
 *     tags: [Clinics]
 *     summary: Consultar clínica por id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Clínica encontrada
 *       404:
 *         description: Clínica no encontrada
 */
clinicRouter.get("/:id", ClinicController.getById);

/**
 * @swagger
 * /clinics:
 *   post:
 *     tags: [Clinics]
 *     summary: Crear clínica
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, address]
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Clínica creada
 */
clinicRouter.post("/", ClinicController.create);

/**
 * @swagger
 * /clinics/{id}:
 *   patch:
 *     tags: [Clinics]
 *     summary: Actualizar clínica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Clínica actualizada
 */
clinicRouter.patch("/:id", ClinicController.update);

/**
 * @openapi
 * /clinics/{id}:
 *   delete:
 *     tags: [Clinics]
 *     summary: Eliminar clínica lógicamente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Clínica eliminada
 */
clinicRouter.delete("/:id", ClinicController.remove);
