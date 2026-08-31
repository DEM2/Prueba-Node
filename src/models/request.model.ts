import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  Op
} from "sequelize";
import { sequelize } from "../config/database";

export type RequestStatus =
  | "PENDIENTE"
  | "APROBADA"
  | "RECHAZADA"
  | "EN_PROCESO"
  | "COMPLETADA"
  | "CANCELADA";

export class Request extends Model<
  InferAttributes<Request>,
  InferCreationAttributes<Request>
> {
  declare id: CreationOptional<number>;
  declare clinicId: number;
  declare medicineId: number;
  declare warehouseId: number;
  declare quantity: number;
  declare status: RequestStatus;
  declare requestedByUserId: number;
  declare notes: string | null;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Request.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    clinicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    medicineId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(
        "PENDIENTE",
        "APROBADA",
        "RECHAZADA",
        "EN_PROCESO",
        "COMPLETADA",
        "CANCELADA"
      ),
      allowNull: false,
      defaultValue: "PENDIENTE"
    },
    requestedByUserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: "requests",
    timestamps: true
  }
);

export const ACTIVE_REQUEST_STATUSES: RequestStatus[] = [
  "PENDIENTE",
  "APROBADA",
  "EN_PROCESO"
];

export const FINAL_REQUEST_STATUSES: RequestStatus[] = [
  "RECHAZADA",
  "COMPLETADA",
  "CANCELADA"
];

export const requestWhereActive = {
  isDeleted: false,
  status: { [Op.notIn]: FINAL_REQUEST_STATUSES }
};
