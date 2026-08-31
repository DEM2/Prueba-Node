import type { NextFunction, Request, Response } from "express";
import { MedicineService } from "../services/medicine.service";

const service = new MedicineService();

export class MedicineController {
  static async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const medicines = await service.list();
      res.status(200).json({ data: medicines });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const medicine = await service.getById(Number(req.params.id));
      res.status(200).json({ data: medicine });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const medicine = await service.create(req.body);
      res.status(201).json({ message: "Medicine created", data: medicine });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const medicine = await service.update(Number(req.params.id), req.body);
      res.status(200).json({ message: "Medicine updated", data: medicine });
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
