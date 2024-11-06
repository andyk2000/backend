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

class Bill extends Model<InferAttributes<Bill>, InferCreationAttributes<Bill>> {
  declare id: CreationOptional<number>;
  declare medicalFacilityId: number;
  declare date: Date;
  declare status: string;
  declare totalAmount: number;
  declare startDate: Date;
  declare endDate: Date;
}

const initializeBill = (sequelize: Sequelize) => {
  Bill.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      medicalFacilityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "medicalFacilities",
          key: "id",
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
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

export { initializeBill, Bill };
