const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Points = sequelize.define(
  "t_points",
  {
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sign_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Points;
