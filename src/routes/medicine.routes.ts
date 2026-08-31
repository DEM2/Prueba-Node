import { Router } from "express";
import { MedicineController } from "../controllers/medicine.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

export const medicineRouter = Router();

medicineRouter.use(authenticate, authorize("ADMIN"));

/**
 * @swagger
 * /medicines:
 *   get:
 *     tags: [Medicines]
 *     summary: Listar medicamentos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de medicamentos activos
 */
medicineRouter.get("/", MedicineController.list);

/**
 * @swagger
 * /medicines/{id}:
 *   get:
 *     tags: [Medicines]
 *     summary: Consultar medicamento por id
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
 *         description: Medicamento encontrado
 *       404:
 *         description: Medicamento no encontrado
 */
medicineRouter.get("/:id", MedicineController.getById);

/**
 * @openapi
 * /medicines:
 *   post:
 *     tags: [Medicines]
 *     summary: Crear medicamento
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, stock]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               stock:
 *                 type: integer
 *                 minimum: 0
 *     responses:
 *       201:
 *         description: Medicamento creado
 */
medicineRouter.post("/", MedicineController.create);

/**
 * @openapi
 * /medicines/{id}:
 *   patch:
 *     tags: [Medicines]
 *     summary: Actualizar medicamento
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
 *               description:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Medicamento actualizado
 */
medicineRouter.patch("/:id", MedicineController.update);

/**
 * @openapi
 * /medicines/{id}:
 *   delete:
 *     tags: [Medicines]
 *     summary: Eliminar medicamento lógicamente
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
 *         description: Medicamento eliminado
 */
medicineRouter.delete("/:id", MedicineController.remove);
