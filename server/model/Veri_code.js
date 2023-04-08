const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Veri_code = sequelize.define(
  "t_veri_code",
  {
    account: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true
    },
    veri_code: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Veri_code;
