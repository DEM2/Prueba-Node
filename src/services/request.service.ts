import { AppError } from "../utils/app-error";
import { RequestRepository } from "../repositories/request.repository";
import { ClinicRepository } from "../repositories/clinic.repository";
import { MedicineRepository } from "../repositories/medicine.repository";
import { WarehouseRepository } from "../repositories/warehouse.repository";
import type { RequestStatus } from "../models/request.model";

export class RequestService {
  constructor(
    private readonly requests = new RequestRepository(),
    private readonly clinics = new ClinicRepository(),
    private readonly medicines = new MedicineRepository(),
    private readonly warehouses = new WarehouseRepository()
  ) {}

  async listHistory() {
    return this.requests.findAll();
  }

  async listActive() {
    return this.requests.findActive();
  }

  async listByClinic(clinicId: number) {
    const clinic = await this.clinics.findById(clinicId);
    if (!clinic) throw new AppError(404, "Clinic not found");
    return this.requests.findByClinic(clinicId);
  }

  async create(input: {
    clinicId: number;
    medicineId: number;
    warehouseId: number;
    quantity: number;
    requestedByUserId: number;
    notes?: string | null;
    status?: RequestStatus;
  }) {
    if (!input.clinicId || !input.medicineId || !input.warehouseId) {
      throw new AppError(400, "clinicId, medicineId and warehouseId are required");
    }

    if (!input.requestedByUserId) {
      throw new AppError(400, "requestedByUserId is required");
    }

    const clinic = await this.clinics.findById(input.clinicId);
    if (!clinic) throw new AppError(404, "Clinic not found");

    const medicine = await this.medicines.findById(input.medicineId);
    if (!medicine) throw new AppError(404, "Medicine not found");

    const warehouse = await this.warehouses.findById(input.warehouseId);
    if (!warehouse) throw new AppError(404, "Warehouse not found");

    const quantity = Number(input.quantity);
    if (!Number.isFinite(quantity) || quantity <= 0) {
      throw new AppError(400, "quantity must be greater than 0");
    }

    if (medicine.stock < quantity) {
      throw new AppError(400, "Insufficient medicine stock available");
    }

    return this.requests.create({
      clinicId: input.clinicId,
      medicineId: input.medicineId,
      warehouseId: input.warehouseId,
      quantity,
      requestedByUserId: input.requestedByUserId,
      notes: input.notes ?? null,
      status: input.status ?? "PENDIENTE"
    });
  }

  async updateStatus(id: number, status: RequestStatus) {
    const request = await this.requests.findById(id);
    if (!request) throw new AppError(404, "Request not found");

    const validStatuses: RequestStatus[] = [
      "PENDIENTE",
      "APROBADA",
      "RECHAZADA",
      "EN_PROCESO",
      "COMPLETADA",
      "CANCELADA"
    ];

    if (!validStatuses.includes(status)) {
      throw new AppError(400, "Invalid status");
    }

    await this.requests.updateStatus(id, status);
    return this.requests.findById(id);
  }

  async remove(id: number) {
    const request = await this.requests.findById(id);
    if (!request) throw new AppError(404, "Request not found");

    await this.requests.softDelete(id);
    return { message: "Request deleted logically" };
  }

  async listAll() {
    return this.requests.findAll();
  }

  async getById(id: number) {
    const request = await this.requests.findById(id);
    if (!request) throw new AppError(404, "Request not found");
    return request;
  }
}
