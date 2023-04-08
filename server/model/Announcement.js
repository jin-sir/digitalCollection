const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Announcement = sequelize.define(
  "t_announcement",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);
module.exports = Announcement;
