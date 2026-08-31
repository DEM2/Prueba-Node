import { Op } from "sequelize";
import { Request, requestWhereActive, type RequestStatus } from "../models/request.model";
import { Clinic } from "../models/clinic.model";
import { Medicine } from "../models/medicine.model";
import { Warehouse } from "../models/warehouse.model";
import { User } from "../models/user.model";

export interface CreateRequestData {
  clinicId: number;
  medicineId: number;
  warehouseId: number;
  quantity: number;
  requestedByUserId: number;
  notes?: string | null;
  status?: RequestStatus;
}

export class RequestRepository {
  private include = [
    { model: Clinic, as: "clinic" },
    { model: Medicine, as: "medicine" },
    { model: Warehouse, as: "warehouse" },
    { model: User, as: "requestedByUser", attributes: { exclude: ["password"] } }
  ];

  findAll() {
    return Request.findAll({
      where: { isDeleted: false },
      include: this.include,
      order: [["createdAt", "DESC"]]
    });
  }

  findActive() {
    return Request.findAll({
      where: requestWhereActive,
      include: this.include,
      order: [["createdAt", "DESC"]]
    });
  }

  findByClinic(clinicId: number) {
    return Request.findAll({
      where: { clinicId, isDeleted: false },
      include: this.include,
      order: [["createdAt", "DESC"]]
    });
  }

  findById(id: number) {
    return Request.findOne({
      where: { id, isDeleted: false },
      include: this.include
    });
  }

  create(data: CreateRequestData) {
    return Request.create({
      ...data,
      status: data.status ?? "PENDIENTE",
      isDeleted: false
    });
  }

  updateStatus(id: number, status: RequestStatus) {
    return Request.update(
      { status },
      { where: { id, isDeleted: false } }
    );
  }

  softDelete(id: number) {
    return Request.update(
      { isDeleted: true },
      { where: { id, isDeleted: false } }
    );
  }
}
