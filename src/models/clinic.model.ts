import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional
} from "sequelize";
import { sequelize } from "../config/database";

export class Clinic extends Model<
  InferAttributes<Clinic>,
  InferCreationAttributes<Clinic>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Clinic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false
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
    tableName: "clinics",
    timestamps: true
  }
);
