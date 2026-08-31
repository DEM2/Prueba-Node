import { Warehouse } from "../models/warehouse.model";

export interface CreateWarehouseData {
  name: string;
  address: string;
}

export class WarehouseRepository {
  findAll() {
    return Warehouse.findAll({
      where: { isDeleted: false },
      order: [["id", "ASC"]]
    });
  }

  findById(id: number) {
    return Warehouse.findOne({ where: { id, isDeleted: false } });
  }

  create(data: CreateWarehouseData) {
    return Warehouse.create({ ...data, isDeleted: false });
  }

  update(id: number, data: Partial<CreateWarehouseData>) {
    return Warehouse.update(data, {
      where: { id, isDeleted: false }
    });
  }

  softDelete(id: number) {
    return Warehouse.update(
      { isDeleted: true },
      { where: { id, isDeleted: false } }
    );
  }
}
