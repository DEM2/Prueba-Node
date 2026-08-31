import { AppError } from "../utils/app-error";
import { ClinicRepository } from "../repositories/clinic.repository";

export class ClinicService {
  constructor(private readonly clinics = new ClinicRepository()) {}

  async list() {
    return this.clinics.findAll();
  }

  async getById(id: number) {
    const clinic = await this.clinics.findById(id);
    if (!clinic) throw new AppError(404, "Clinic not found");
    return clinic;
  }

  async create(input: { name: string; address: string }) {
    const name = input.name.trim();
    const address = input.address.trim();

    if (!name) throw new AppError(400, "name is required");
    if (!address) throw new AppError(400, "address is required");

    return this.clinics.create({ name, address });
  }

  async update(id: number, input: { name?: string; address?: string }) {
    const clinic = await this.getById(id);
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
      return clinic;
    }

    await this.clinics.update(id, payload);
    return this.getById(id);
  }

  async remove(id: number) {
    await this.getById(id);
    await this.clinics.softDelete(id);
    return { message: "Clinic deleted logically" };
  }
}
