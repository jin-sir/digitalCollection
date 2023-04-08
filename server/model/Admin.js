const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Admin = sequelize.define(
  "t_admin",
  {
    account: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    pwd: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Admin;
