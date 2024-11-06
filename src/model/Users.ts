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

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare names: string;
  declare email: string;
  declare password: string;
  declare typeOfAccount: string;
  declare institutionId: number;
  declare title: string;
  declare phone: number;
}

const initializeUser = (sequelize: Sequelize) => {
  User.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      typeOfAccount: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "customer",
      },
      institutionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "doctor",
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user",
      timestamps: false,
    },
  );
};

export { initializeUser, User };
