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
        validate: {
          isIn: [["open", "on-going", "closed", "appeal"]],
        },
      },
      mdaId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
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

const getRequestById = async (id: number) => {
  return await Request.findOne({
    where: {
      id: id,
    },
  });
};

const getRequestByMDF = async (id: number) => {
  return await Request.findAll({
    where: {
      medicalFacilityId: id,
    },
  });
};

const getRequestByDoctor = async (id: number) => {
  return await Request.findAll({
    where: {
      doctorId: id,
    },
  });
};

const getRequestByPatient = async (id: number) => {
  return await Request.findAll({
    where: {
      patientId: id,
    },
    include: {
      model: User,
    },
  });
};

const updateRequestStatus = async (id: number, status: string) => {
  const updatedRequest = await Request.update(
    { status: status },
    {
      where: { id: id },
    },
  );
};

export {
  initializeRequest,
  createRequest,
  Request,
  getRequestById,
  getRequestByMDF,
  getRequestByPatient,
  getRequestByDoctor,
  updateRequestStatus,
};
