import { DataTypes, Model, type Sequelize } from "sequelize";
import { BrandStatus } from "../../../../../shared/dto/status";

export class BrandPersistence extends Model { }

export function init(sequelize: Sequelize) {
  BrandPersistence.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      tag_line: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM(BrandStatus.ACTIVE, BrandStatus.INACTIVE),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Brand',
      timestamps: true,
      tableName: 'brands',
    }
  );
}