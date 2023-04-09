const Collection_selling = require("../model/Collection_selling");

/**
 * 发布寄售
 * @param {*} obj
 * @returns
 */
exports.addCollection_selling = async function (obj) {
  const result = await Collection_selling.create(obj);
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 获取个人寄售
 * @returns
 */
exports.queryCollection_selling = async function (uId, page = 1, limit = 10) {
  const result = await Collection_selling.findAll({
    where: {
      uId,
      state: true,
    },
    offset: (page - 1) * limit,
    limit: limit,
    group: "cId",
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
exports.queryGoodsListByPage = async function (
  cId,
  page = 1,
  limit = 10,
  sort
) {
  const result = await Collection_selling.findAll({
    where: {
      cId,
    },
    offset: (page - 1) * limit,
    limit: limit,
    order: [
      ["selling_price", sort],
      ["createdAt", "asc"],
    ],
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
exports.queryGoods = async function (cId, seri_num) {
  const result = await Collection_selling.findOne({
    where: {
      cId,
      seri_num,
    },
  });
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 锁单
 * @param {*} cId
 * @param {*} seri_num
 * @param {*} lock_time
 * @returns
 */
exports.updateLockTime = async function (cId, seri_num, lock_time) {
  const result = await Collection_selling.update(
    { lock_time },
    {
      where: {
        cId,
        seri_num,
      },
    }
  );
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 修改寄售状态
 * @param {*} cId
 * @param {*} seri_num
 * @param {*} lock_time
 * @returns
 */
exports.updateSellState = async function (cId, seri_num, sell_state) {
  const result = await Collection_selling.update(
    { sell_state },
    {
      where: {
        cId,
        seri_num,
      },
    }
  );
  if (result) {
    return result.toJSON();
  }
  return result;
};

// 删除记录

exports.deleteSellingLog = async function (uId, cId, seri_num) {
  const result = await Collection_selling.destroy({
    where: {
      uId,
      cId,
      seri_num,
    },
  });
  console.log(result)
  return result;
};
