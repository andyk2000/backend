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

class Appeal extends Model<
  InferAttributes<Appeal>,
  InferCreationAttributes<Appeal>
> {
  declare id: CreationOptional<number>;
  declare patientId: number;
  declare doctorId: number;
  declare medicalfacilityId: number;
  declare responseId: number;
  declare response: string;
  declare argument: string;
  declare additionalresources: string;
  declare status: string;
  declare date: Date;
}

const initializeAppeal = (sequelize: Sequelize) => {
  Appeal.init(
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
      medicalfacilityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "medicalFacilities",
          key: "id",
        },
      },
      responseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "responses",
          key: "id",
        },
      },
      response: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      argument: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      additionalresources: {
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
    },
    {
      sequelize,
      modelName: "bill",
      timestamps: false,
    },
  );
};

export { initializeAppeal, Appeal };
