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

class Request extends Model<
  InferAttributes<Request>,
  InferCreationAttributes<Request>
> {
  declare id: CreationOptional<number>;
  declare patientId: number;
  declare doctorId: number;
  declare medicalFacilityId: number;
  declare title: string;
  declare description: string;
  declare resources: string;
  declare status: string;
  declare date: Date;
  declare mdaId: number;
}

const initializeRequest = (sequelize: Sequelize) => {
  Request.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "patients",
          key: "id",
        },
      },
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      medicalFacilityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "medicalFacilities",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "medical service request",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      resources: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      mdaId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      }
    },
    {
      sequelize,
      modelName: "request",
      timestamps: true,
    },
  );
};

const createRequest = async (request: CreationAttributes<Request>) => {
  return await Request.create(request);
};

export { initializeRequest, createRequest, Request };
