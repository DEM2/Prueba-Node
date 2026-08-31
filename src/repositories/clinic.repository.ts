import { Clinic } from "../models/clinic.model";

export interface CreateClinicData {
  name: string;
  address: string;
}

export class ClinicRepository {
  findAll() {
    return Clinic.findAll({
      where: { isDeleted: false },
      order: [["id", "ASC"]]
    });
  }

  findById(id: number) {
    return Clinic.findOne({ where: { id, isDeleted: false } });
  }

  create(data: CreateClinicData) {
    return Clinic.create({ ...data, isDeleted: false });
  }

  update(id: number, data: Partial<CreateClinicData>) {
    return Clinic.update(data, {
      where: { id, isDeleted: false }
    });
  }

  softDelete(id: number) {
    return Clinic.update(
      { isDeleted: true },
      { where: { id, isDeleted: false } }
    );
  }
}
