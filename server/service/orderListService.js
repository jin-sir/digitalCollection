const Order_list = require("../model/Order_list");
const Collection_selling = require("../model/Collection_selling");

/**
 * 创建订单
 * @param {*} obj
 * @returns
 */
exports.addOrder_list = async function (obj) {
  const result = await Order_list.create(obj);
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 获取个人订单
 * @returns
 */
exports.queryOrder_list = async function (uId, page = 1, limit = 10) {
  const result = await Order_list.findAll({
    where: {
      uId,
    },
    offset: (page - 1) * limit,
    limit: limit,
    order: [["createdAt", "desc"]],
  });
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 获取商品列表
 * @returns
 */
exports.queryGoodsListByPage = async function (cId, page = 1, limit = 10) {
  const result = await Order_list.findAll({
    where: {
      cId,
    },
    offset: (page - 1) * limit,
    limit: limit,
    order: [["createdAt", "asc"]],
  });
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 获取某一个藏品
 * @returns
 */
exports.queryOrder = async function (id, uId) {
  const result = await Order_list.findOne({
    where: {
      id,
      uId,
    },
    include: {
      Collection_selling,
    },
  });
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 修改订单状态
 * @returns
 */
exports.updateSellState = async function (id, uId, sell_state) {
  const result = await Order_list.update(
    { sell_state },
    {
      where: {
        id,
        uId,
      },
    }
  );
  if (result) {
    return result.toJSON();
  }
  return result;
};
