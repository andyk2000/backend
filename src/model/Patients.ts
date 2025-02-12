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

class Patient extends Model<
  InferAttributes<Patient>,
  InferCreationAttributes<Patient>
> {
  declare id: CreationOptional<number>;
  declare names: string;
  declare phone: number;
  declare age: string;
  declare address: string;
  declare sex: string;
  declare dependent: boolean;
  declare nationalId: number;
}

const initializePatient = (sequelize: Sequelize) => {
  Patient.init(
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
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dependent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      nationalId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "patient",
      timestamps: true,
    },
  );
};

const createPatient = async (patient: CreationAttributes<Patient>) => {
  return await Patient.create(patient);
};

export { initializePatient, createPatient, Patient };
