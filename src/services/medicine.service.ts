import { AppError } from "../utils/app-error";
import { MedicineRepository } from "../repositories/medicine.repository";

export class MedicineService {
  constructor(private readonly medicines = new MedicineRepository()) {}

  async list() {
    return this.medicines.findAll();
  }

  async getById(id: number) {
    const medicine = await this.medicines.findById(id);
    if (!medicine) throw new AppError(404, "Medicine not found");
    return medicine;
  }

  async create(input: { name: string; description: string; stock: number }) {
    const name = input.name.trim();
    const description = input.description.trim();
    const stock = Number(input.stock);

    if (!name) throw new AppError(400, "name is required");
    if (!description) throw new AppError(400, "description is required");
    if (!Number.isFinite(stock) || stock < 0) {
      throw new AppError(400, "stock must be a positive number");
    }

    return this.medicines.create({ name, description, stock });
  }

  async update(id: number, input: { name?: string; description?: string; stock?: number }) {
    const medicine = await this.getById(id);
    const payload: { name?: string; description?: string; stock?: number } = {};

    if (input.name !== undefined) {
      const name = input.name.trim();
      if (!name) throw new AppError(400, "name is required");
      payload.name = name;
    }

    if (input.description !== undefined) {
      const description = input.description.trim();
      if (!description) throw new AppError(400, "description is required");
      payload.description = description;
    }

    if (input.stock !== undefined) {
      const stock = Number(input.stock);
      if (!Number.isFinite(stock) || stock < 0) {
        throw new AppError(400, "stock must be a positive number");
      }
      payload.stock = stock;
    }

    if (Object.keys(payload).length === 0) {
      return medicine;
    }

    await this.medicines.update(id, payload);
    return this.getById(id);
  }

  async remove(id: number) {
    await this.getById(id);
    await this.medicines.softDelete(id);
    return { message: "Medicine deleted logically" };
  }
}
