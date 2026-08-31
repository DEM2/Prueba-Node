import type { NextFunction, Request, Response } from "express";
import { WarehouseService } from "../services/warehouse.service";

const service = new WarehouseService();

export class WarehouseController {
  static async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const warehouses = await service.list();
      res.status(200).json({ data: warehouses });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const warehouse = await service.getById(Number(req.params.id));
      res.status(200).json({ data: warehouse });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const warehouse = await service.create(req.body);
      res.status(201).json({ message: "Warehouse created", data: warehouse });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const warehouse = await service.update(Number(req.params.id), req.body);
      res.status(200).json({ message: "Warehouse updated", data: warehouse });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.remove(Number(req.params.id));
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
