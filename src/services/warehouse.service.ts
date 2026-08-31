import { AppError } from "../utils/app-error";
import { WarehouseRepository } from "../repositories/warehouse.repository";

export class WarehouseService {
  constructor(private readonly warehouses = new WarehouseRepository()) {}

  async list() {
    return this.warehouses.findAll();
  }

  async getById(id: number) {
    const warehouse = await this.warehouses.findById(id);
    if (!warehouse) throw new AppError(404, "Warehouse not found");
    return warehouse;
  }

  async create(input: { name: string; address: string }) {
    const name = input.name.trim();
    const address = input.address.trim();

    if (!name) throw new AppError(400, "name is required");
    if (!address) throw new AppError(400, "address is required");

    return this.warehouses.create({ name, address });
  }

  async update(id: number, input: { name?: string; address?: string }) {
    const warehouse = await this.getById(id);
    const payload: { name?: string; address?: string } = {};

    if (input.name !== undefined) {
      const name = input.name.trim();
      if (!name) throw new AppError(400, "name is required");
      payload.name = name;
    }

    if (input.address !== undefined) {
      const address = input.address.trim();
      if (!address) throw new AppError(400, "address is required");
      payload.address = address;
    }

    if (Object.keys(payload).length === 0) {
      return warehouse;
    }

    await this.warehouses.update(id, payload);
    return this.getById(id);
  }

  async remove(id: number) {
    await this.getById(id);
    await this.warehouses.softDelete(id);
    return { message: "Warehouse deleted logically" };
  }
}
