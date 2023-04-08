const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Swiper = sequelize.define(
  "t_swiper",
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVisible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Swiper;
