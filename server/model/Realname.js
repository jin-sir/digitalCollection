const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Realname = sequelize.define(
  "t_realname",
  {
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    IDCard: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Realname;
