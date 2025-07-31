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
import { Resource } from "./Resources";
import { Appeal } from "./Appeals";
import { Response } from "./Responses";
import { MedicalFacility } from "./MedicalFacilities";

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
  declare resources: boolean;
  declare status: number;
  declare mdaId: number;
  declare priority: number;
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
        type: DataTypes.BOOLEAN,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[1, 2, 3, 4, 5, 6]],
        },
      },
      mdaId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      priority: {
        type: DataTypes.INTEGER,
        validate: {
          isIn: [[1, 2, 3]],
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

const createRequest = async (
  request: Omit<InferCreationAttributes<Request, { omit: never }>, "id">,
) => {
  return await Request.create(request);
};

const getAllRequest = async () => {
  return await Request.findAll({
    include: [
      {
        model: Patient,
        attributes: ["names"],
      },
      {
        model: User,
        as: "doctor",
        attributes: ["names"],
      },
    ],
  });
};

const getRequestById = async (id: number) => {
  return await Request.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Resource,
        attributes: ["resourcePath"],
      },
      {
        model: Patient,
        attributes: ["names"],
      },
      {
        model: User,
        as: "doctor",
        attributes: ["names"],
      },
    ],
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
    attributes: ["id", "title", "patientId", "priority", "status"],
    where: {
      doctorId: id,
    },
    include: [
      {
        model: Resource,
        attributes: ["resourcePath"],
      },
      {
        model: Patient,
        attributes: ["names"],
      },
      {
        model: User,
        as: "doctor",
        attributes: ["names"],
      },
    ],
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

const updateRequestStatus = async (id: number, status: number) => {
  const updatedRequest = await Request.update(
    { status: status },
    {
      where: { id: id },
    },
  );
};

const changeRequestStatus = async (id: number, status: number) => {
  const updatedRequest = await Request.update(
    { status: status },
    {
      where: { id: id },
    },
  );
};

const getRequestWithAppeal = async (id: number) => {
  let requestData: any = await Request.findOne({
    where: {
      id: id,
    },
    include: {
      model: Response,
      include: [
        {
          model: Appeal,
        },
      ],
    },
  });
  return requestData;
};

const requestDataReport = async (id: number) => {
  const requestData = await Request.findOne({
  where: { id: id },
  include: [
    {
      model: Patient,
      attributes: [
        "names",
        "age",
        "address",
        "sex",
        "nationalId",
        "phone",
        "patientIdentification",
      ],
    },
    {
      model: User,
      as: "doctor",
      attributes: ["names", "email", "phone", "title"],
    },
    {
      model: MedicalFacility,
      attributes: ["name", "address", "phone", "email"],
    },
    {
      model: Response,
      include: [
        {
          model: Appeal,
          attributes: [
            "argument",
            "additionalresources",
            "status",
            "appealDecisionArgument",
            "createdAt",
          ],
        },
      ],
      attributes: ["answer", "comment", "date"],
    },
    {
      model: Resource,
      attributes: ["resourcePath", "type"],
    },
  ],
});
  return requestData;
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
  getAllRequest,
  changeRequestStatus,
  getRequestWithAppeal,
  requestDataReport,
};
