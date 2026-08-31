import type { NextFunction, Request, Response } from "express";
import { ClinicService } from "../services/clinic.service";

const service = new ClinicService();

export class ClinicController {
  static async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const clinics = await service.list();
      res.status(200).json({ data: clinics });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const clinic = await service.getById(Number(req.params.id));
      res.status(200).json({ data: clinic });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const clinic = await service.create(req.body);
      res.status(201).json({ message: "Clinic created", data: clinic });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const clinic = await service.update(Number(req.params.id), req.body);
      res.status(200).json({ message: "Clinic updated", data: clinic });
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
