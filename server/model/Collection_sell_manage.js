const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Collection_sell_manage = sequelize.define(
  "t_collection_sell_manage",
  {
    cId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    cName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    circulation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sumstock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    auther: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    limit_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sellTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isUpdate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isBusiness: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Collection_sell_manage;
