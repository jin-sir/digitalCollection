const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Collection_selling = sequelize.define(
  "t_collection_selling",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    seri_num: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    selling_state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    selling_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lock_time: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    paranoid: true,
  }
);

module.exports = Collection_selling;
