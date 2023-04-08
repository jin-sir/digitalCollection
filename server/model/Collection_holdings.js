const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Collection_holdings = sequelize.define(
  "t_collection_holdings",
  {
    seri_num: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Collection_holdings;
