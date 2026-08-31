import { Router } from "express";
import { RequestController } from "../controllers/request.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

export const requestRouter = Router();

/**
 * @swagger
 * /requests:
 *   get:
 *     tags: [Requests]
 *     summary: Listar historial completo de solicitudes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Historial completo de solicitudes
 */
requestRouter.get("/", authenticate, authorize("ADMIN", "GESTOR"), RequestController.listAll);

/**
 * @swagger
 * /requests/active:
 *   get:
 *     tags: [Requests]
 *     summary: Consultar solicitudes activas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Solicitudes activas
 */
requestRouter.get("/active", authenticate, RequestController.listActive);

/**
 * @openapi
 * /requests/history:
 *   get:
 *     tags: [Requests]
 *     summary: Consultar historial de solicitudes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Historial de solicitudes
 */
requestRouter.get("/history", authenticate, RequestController.listHistory);

/**
 * @openapi
 * /requests/clinic/{clinicId}:
 *   get:
 *     tags: [Requests]
 *     summary: Consultar historial de solicitudes por clínica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clinicId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Solicitudes filtradas por clínica
 */
requestRouter.get("/clinic/:clinicId", authenticate, RequestController.listByClinic);

/**
 * @openapi
 * /requests/{id}:
 *   get:
 *     tags: [Requests]
 *     summary: Consultar solicitud por id
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
 *         description: Solicitud encontrada
 *       404:
 *         description: Solicitud no encontrada
 */
requestRouter.get("/:id", authenticate, authorize("ADMIN", "GESTOR"), RequestController.getById);

/**
 * @openapi
 * /requests:
 *   post:
 *     tags: [Requests]
 *     summary: Crear solicitud
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [clinicId, medicineId, warehouseId, quantity]
 *             properties:
 *               clinicId:
 *                 type: integer
 *               medicineId:
 *                 type: integer
 *               warehouseId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *               notes:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDIENTE, APROBADA, RECHAZADA, EN_PROCESO, COMPLETADA, CANCELADA]
 *     responses:
 *       201:
 *         description: Solicitud creada
 */
requestRouter.post("/", authenticate, authorize("ADMIN", "GESTOR"), RequestController.create);

/**
 * @openapi
 * /requests/{id}/status:
 *   patch:
 *     tags: [Requests]
 *     summary: Actualizar estado de solicitud
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
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDIENTE, APROBADA, RECHAZADA, EN_PROCESO, COMPLETADA, CANCELADA]
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
requestRouter.patch("/:id/status", authenticate, authorize("ADMIN", "GESTOR"), RequestController.updateStatus);

/**
 * @openapi
 * /requests/{id}:
 *   delete:
 *     tags: [Requests]
 *     summary: Eliminar solicitud lógicamente
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
 *         description: Solicitud eliminada
 */
requestRouter.delete("/:id", authenticate, authorize("ADMIN", "GESTOR"), RequestController.remove);
