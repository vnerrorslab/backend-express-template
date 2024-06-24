import { DataTypes, Model, type Sequelize } from "sequelize";
import { CategoryStatus } from "../../../../../shared/dto/status";

export class CategoryPersistence extends Model { }

export function init(sequelize: Sequelize) {
  CategoryPersistence.init(
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

      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM(CategoryStatus.ACTIVE, CategoryStatus.INACTIVE),
        allowNull: false,
      },

      parent_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Category',
      timestamps: true,
      tableName: 'categories',
    }
  );
}