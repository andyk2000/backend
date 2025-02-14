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

class MedicalFacility extends Model<
  InferAttributes<MedicalFacility>,
  InferCreationAttributes<MedicalFacility>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare type: string;
  declare adminId: number;
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
    attributes: ["name", "id"],
  });
  return medicalFacilities;
};

const findMDFByID = async (id: number) => {
  const mdf = await MedicalFacility.findOne({
    where: { id: id },
  });
  return mdf;
};

export {
  initializeMedicalFacility,
  MedicalFacility,
  findAllMDFName,
  findMDFByID,
};
