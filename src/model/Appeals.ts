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
  declare additionalresources: boolean;
  declare status: string;
  declare appealDecisionArgument: string;
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
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["pending", "approved", "denied"]],
        },
      },
      appealDecisionArgument: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "appeal",
      timestamps: false,
    },
  );
};

const createAppeal = async (
  appeal: Omit<InferCreationAttributes<Appeal, { omit: never }>, "id">,
) => {
  return await Appeal.create(appeal);
};

const responseAppeal = async (id: number, decision: string, status: string) => {
  return await Appeal.update(
    { appealDecisionArgument: decision, status: status },
    {
      where: { id: id },
    },
  );
};

export { initializeAppeal, Appeal, createAppeal, responseAppeal };
