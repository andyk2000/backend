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

class Dependent extends Model<
  InferAttributes<Dependent>,
  InferCreationAttributes<Dependent>
> {
  declare id: CreationOptional<number>;
  declare names: string;
  declare phone: number;
  declare age: string;
  declare sex: string;
  declare nationalId: number;
  declare patientIdentification: number;
  declare parentID: number;
}

const initializeDependent = (sequelize: Sequelize) => {
  Dependent.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      names: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nationalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      patientIdentification: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      parentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "patients",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "dependnet",
      timestamps: true,
    },
  );
};

const createDependent = async (dependent: CreationAttributes<Dependent>) => {
  return await Dependent.create(dependent);
};

const getDependentById = async (id: number) => {
  return await Dependent.findOne({
    where: {
      id: id,
    },
  });
};

export { createDependent, getDependentById, Dependent, initializeDependent };
