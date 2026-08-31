import { Router } from "express";
import { WarehouseController } from "../controllers/warehouse.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

export const warehouseRouter = Router();

warehouseRouter.use(authenticate, authorize("ADMIN"));

/**
 * @swagger
 * /warehouses:
 *   get:
 *     tags: [Warehouses]
 *     summary: Listar almacenes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de almacenes activas
 */
warehouseRouter.get("/", WarehouseController.list);

/**
 * @swagger
 * /warehouses/{id}:
 *   get:
 *     tags: [Warehouses]
 *     summary: Consultar almacén por id
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
 *         description: Almacén encontrado
 *       404:
 *         description: Almacén no encontrado
 */
warehouseRouter.get("/:id", WarehouseController.getById);

/**
 * @swagger
 * /warehouses:
 *   post:
 *     tags: [Warehouses]
 *     summary: Crear almacén
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
 *         description: Almacén creado
 */
warehouseRouter.post("/", WarehouseController.create);

/**
 * @swagger
 * /warehouses/{id}:
 *   patch:
 *     tags: [Warehouses]
 *     summary: Actualizar almacén
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
 *         description: Almacén actualizado
 */
warehouseRouter.patch("/:id", WarehouseController.update);

/**
 * @swagger
 * /warehouses/{id}:
 *   delete:
 *     tags: [Warehouses]
 *     summary: Eliminar almacén lógicamente
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
 *         description: Almacén eliminado
 */
warehouseRouter.delete("/:id", WarehouseController.remove);
