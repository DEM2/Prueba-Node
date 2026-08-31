import { Clinic } from "./clinic.model";
import { Medicine } from "./medicine.model";
import { Request } from "./request.model";
import { User } from "./user.model";
import { Warehouse } from "./warehouse.model";

export const initModels = () => {
  User.hasMany(Request, { foreignKey: "requestedByUserId", as: "requests" });
  Clinic.hasMany(Request, { foreignKey: "clinicId", as: "requests" });
  Medicine.hasMany(Request, { foreignKey: "medicineId", as: "requests" });
  Warehouse.hasMany(Request, { foreignKey: "warehouseId", as: "requests" });

  Request.belongsTo(User, { foreignKey: "requestedByUserId", as: "requestedByUser" });
  Request.belongsTo(Clinic, { foreignKey: "clinicId", as: "clinic" });
  Request.belongsTo(Medicine, { foreignKey: "medicineId", as: "medicine" });
  Request.belongsTo(Warehouse, { foreignKey: "warehouseId", as: "warehouse" });

  return { User, Clinic, Medicine, Warehouse, Request };
};
