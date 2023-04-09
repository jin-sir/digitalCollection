const Collection_holdings = require("../model/Collection_holdings");
const Collection_sell_manage = require("../model/Collection_sell_manage");
const { Sequelize } = require("sequelize");
/**
 * 转入藏品
 * @param {*} obj
 * @returns
 */
exports.addCollection_holdings = async function (obj) {
  const result = await Collection_holdings.create(obj);
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 获取个人藏品
 * @returns
 */
exports.queryCollection_holdings = async function (uId, page = 1, limit = 10) {
  const result = await Collection_holdings.findAll({
    attributes: [
      "cId",
      [
        Sequelize.fn("COUNT", Sequelize.col("t_collection_holdings.cId")),
        "count",
      ],
    ],
    where: {
      uId,
    },
    offset: (page - 1) * limit,
    limit: limit,
    group: "cId",
    order: [["createdAt", "desc"]],
    include: {
      attributes: ["url", "cName", "auther", "circulation"],
      model: Collection_sell_manage,
    },
  });
  return result;
};

exports.queryCollectionByCId = async function (uId, cId) {
  const result = await Collection_holdings.findAll({
    where: {
      uId,
      cId,
    },
    order: [["createdAt", "desc"]],
  });
  return result;
};

/**
 * 获取某一个藏品
 * @returns
 */
exports.queryGoods = async function (uId, cId, seri_num) {
  const result = await Collection_holdings.findOne({
    where: {
      uId,
      cId,
      seri_num,
    },
    include: {
      attributes: [
        "url",
        "cName",
        "auther",
        "circulation",
        "isBusiness",
        "limit_price",
      ],
      model: Collection_sell_manage,
    },
  });
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 修改状态
 * @returns
 */
exports.updateState = async function (uId, cId, seri_num, state) {
  const result = await Collection_holdings.update(
    { state },
    {
      where: {
        uId,
        cId,
        seri_num,
      },
    }
  );
  return result;
};

/**
 * 修改状态
 * @returns
 */
exports.deleteHoldingGoods = async function (uId, cId, seri_num) {
  const result = await Collection_holdings.destroy({
    where: {
      uId,
      cId,
      seri_num,
    },
  });
  return result;
};
