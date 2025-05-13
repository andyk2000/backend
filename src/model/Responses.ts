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
import { Request } from "./Requests";

class Response extends Model<
  InferAttributes<Response>,
  InferCreationAttributes<Response>
> {
  declare id: CreationOptional<number>;
  declare requestId: number;
  declare answer: string;
  declare comment: string;
  declare date: Date;
}

const initializeResponse = (sequelize: Sequelize) => {
  Response.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      requestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "requests",
          key: "id",
        },
      },
      answer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "response",
      timestamps: false,
    },
  );
};

const createResponse = async (
  response: Omit<InferCreationAttributes<Response, { omit: never }>, "id">,
) => {
  return await Response.create(response);
};

const getResponseById = async (id: number) => {
  return await Response.findOne({
    where: {
      id: id,
    },
    include: {
      model: Request,
      attributes: [
        "id",
        "patientId",
        "doctorId",
        "medicalFacilityId",
        "title",
        "description",
        "resources",
        "status",
        "mdaId",
        "priority",
      ],
    },
  });
};

export { initializeResponse, Response, getResponseById, createResponse };
