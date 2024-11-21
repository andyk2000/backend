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
  declare responseId: number;
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
      responseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "responses",
          key: "id",
        },
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
      modelName: "appeal",
      timestamps: false,
    },
  );
};

export { initializeAppeal, Appeal };
