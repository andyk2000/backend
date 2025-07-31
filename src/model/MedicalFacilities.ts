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
import { Request } from "./Requests";

class MedicalFacility extends Model<
  InferAttributes<MedicalFacility>,
  InferCreationAttributes<MedicalFacility>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare type: string;
  declare adminId: number;
  declare blocked: boolean;
}

const initializeMedicalFacility = (sequelize: Sequelize) => {
  MedicalFacility.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "medicalFacility",
      timestamps: false,
    },
  );
};

const findAllMDFName = async () => {
  const medicalFacilities = await MedicalFacility.findAll({
    attributes: {
      include: [
        [
          Sequelize.literal(`(
            SELECT COUNT(DISTINCT u.id)
            FROM users u
            WHERE u."institutionId" = "medicalFacility".id
          )`),
          "usersCount",
        ],
        [
          Sequelize.literal(`(
            SELECT COUNT(DISTINCT r.id)
            FROM requests r
            WHERE r."medicalFacilityId" = "medicalFacility".id
          )`),
          "requestsCount",
        ],
      ],
    },
  });
  return medicalFacilities;
};

const findMDFByID = async (id: number) => {
  const mdf = await MedicalFacility.findOne({
    where: { id: id },
    include: [
      {
        model: User,
        attributes: [],
        required: false,
      },
      {
        model: Request,
        attributes: [],
        required: false,
      },
    ],
    attributes: {
      include: [
        [
          Sequelize.literal(`(
            SELECT COUNT(DISTINCT u.id)
            FROM users u
            WHERE u."institutionId" = "medicalFacility".id
          )`),
          "usersCount",
        ],
        [
          Sequelize.literal(`(
            SELECT COUNT(DISTINCT r.id)
            FROM requests r
            WHERE r."medicalFacilityId" = "medicalFacility".id
          )`),
          "requestsCount",
        ],
      ],
    },
    group: ["medicalFacility.id"],
  });
  return mdf;
};

const updateMDAdmin = async (data: NonNullable<unknown>, id: number) => {
  const mdf = await MedicalFacility.update(data, {
    where: {
      id: id,
    },
  });
};

const findMDFByName = async (name: string) => {
  const mdf = await MedicalFacility.findOne({
    where: { name: name },
  });
  return mdf;
};

export {
  initializeMedicalFacility,
  MedicalFacility,
  findAllMDFName,
  findMDFByID,
  updateMDAdmin,
  findMDFByName,
};
