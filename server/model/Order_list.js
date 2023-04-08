const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const OrderList = sequelize.define(
  "t_order_list",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    sell_state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = OrderList;
