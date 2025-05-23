import {
  DataTypes,
  Sequelize,
  Model,
  Op,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
  CreationAttributes,
} from "sequelize";
import { User } from "./Users";
import { Patient } from "./Patients";

class Resource extends Model<
  InferAttributes<Resource>,
  InferCreationAttributes<Resource>
> {
  declare id: CreationOptional<number>;
  declare requestId: number;
  declare resourcePath: string;
}

const initializeResource = (sequelize: Sequelize) => {
  Resource.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      requestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      resourcePath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Resources",
      timestamps: true,
    },
  );
};

const createResource = async (
  resource: Omit<InferCreationAttributes<Resource, { omit: never }>, "id">,
) => {
  return await Resource.create(resource);
};

export { initializeResource, Resource, createResource };
