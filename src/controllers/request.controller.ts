import type { NextFunction, Request, Response } from "express";
import { RequestService } from "../services/request.service";

const service = new RequestService();

export class RequestController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request = await service.create({
        ...req.body,
        requestedByUserId: req.user?.sub ?? req.body.requestedByUserId
      });
      res.status(201).json({ message: "Request created", data: request });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const request = await service.updateStatus(Number(req.params.id), req.body.status);
      res.status(200).json({ message: "Request status updated", data: request });
    } catch (error) {
      next(error);
    }
  }

  static async listHistory(_req: Request, res: Response, next: NextFunction) {
    try {
      const history = await service.listHistory();
      res.status(200).json({ data: history });
    } catch (error) {
      next(error);
    }
  }

  static async listActive(_req: Request, res: Response, next: NextFunction) {
    try {
      const activeRequests = await service.listActive();
      res.status(200).json({ data: activeRequests });
    } catch (error) {
      next(error);
    }
  }

  static async listByClinic(req: Request, res: Response, next: NextFunction) {
    try {
      const requests = await service.listByClinic(Number(req.params.clinicId));
      res.status(200).json({ data: requests });
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

  static async listAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const requests = await service.listAll();
      res.status(200).json({ data: requests });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const request = await service.getById(Number(req.params.id));
      res.status(200).json({ data: request });
    } catch (error) {
      next(error);
    }
  }
}
