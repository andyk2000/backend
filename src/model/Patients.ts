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
  declare phone: bigint;
  declare age: string;
  declare address: string;
  declare sex: string;
  declare dependent: boolean;
  declare nationalId: bigint;
  declare patientIdentification: number;
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
        type: DataTypes.BIGINT,
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
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      patientIdentification: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
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

const getPatientById = async (id: number) => {
  return await Patient.findOne({
    where: {
      patientIdentification: id,
    },
  });
};

export { initializePatient, createPatient, getPatientById, Patient };
