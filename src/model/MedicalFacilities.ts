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

export { initializeMedicalFacility, MedicalFacility };
