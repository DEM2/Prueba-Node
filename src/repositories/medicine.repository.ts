import { Medicine } from "../models/medicine.model";

export interface CreateMedicineData {
  name: string;
  description: string;
  stock: number;
}

export class MedicineRepository {
  findAll() {
    return Medicine.findAll({
      where: { isDeleted: false },
      order: [["id", "ASC"]]
    });
  }

  findById(id: number) {
    return Medicine.findOne({ where: { id, isDeleted: false } });
  }

  create(data: CreateMedicineData) {
    return Medicine.create({ ...data, isDeleted: false });
  }

  update(id: number, data: Partial<CreateMedicineData>) {
    return Medicine.update(data, {
      where: { id, isDeleted: false }
    });
  }

  softDelete(id: number) {
    return Medicine.update(
      { isDeleted: true },
      { where: { id, isDeleted: false } }
    );
  }
}
