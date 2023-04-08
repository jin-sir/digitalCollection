const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "t_user",
  {
    uId: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    account: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
    },
    nick: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    pwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trade_pwd: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(42),
      allowNull: false,
      unique: true,
    },
    isSign: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    invite_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    higher_level: {
      type: DataTypes.STRING(42),
      allowNull: true,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = User;
