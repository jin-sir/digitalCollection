const Collection_sell_manage = require("../model/Collection_sell_manage");

/**
 * 实名
 * @param {*} obj
 * @returns
 */
exports.addCollection_sell_manage = async function (obj) {
  const result = await Collection_sell_manage.create(obj);
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 获取藏品发售表
 * @returns
 */
exports.queryCollection_sell_manage = async function () {
  const result = await Collection_sell_manage.findAll({
    order: [["createdAt", "desc"]],
  });
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 获取藏品信息
 * @returns
 */
exports.queryProductInfo = async function (cId) {
  const result = await Collection_sell_manage.findOne({
    where: {
      cId,
    },
  });
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 分页获取藏品发售表
 * @returns
 */
exports.queryCollection_sell_manageByPage = async function (
  page = 1,
  limit = 5
) {
  const result = await Collection_sell_manage.findAll({
    where: {
      isUpdate: true,
    },
    offset: (page - 1) * limit,
    limit: limit,
    order: [["createdAt", "desc"]],
  });
  return result;
};

/**
 * 分页获取寄售市场
 * @returns
 */
exports.queryMarketByPage = async function (page = 1, limit = 5) {
  const result = await Collection_sell_manage.findAll({
    where: {
      IsBusiness: true,
    },
    offset: (page - 1) * limit,
    limit: limit,
    order: [["createdAt", "desc"]],
  });
  return result;
};

/**
 * 开启/关闭 寄售
 * @param {*} cId
 * @returns
 */
exports.updateIsBusiness = async function (cId, isBusiness) {
  const result = await Collection_sell_manage.update(
    { isBusiness },
    {
      where: {
        cId,
      },
    }
  );
  return result;
};

/**
 * 开启/关闭 上架
 * @param {*} cId
 * @returns
 */
exports.updateIsUpdate = async function (cId, isUpdate) {
  const result = await Collection_sell_manage.update(
    { isUpdate },
    {
      where: {
        cId,
      },
    }
  );
  return result;
};

/**
 * 修改限价
 * @param {*} cId
 * @returns
 */
exports.updateLimit_price = async function (cId, limit_price) {
  const result = await Collection_sell_manage.update(
    { limit_price },
    {
      where: {
        cId,
      },
    }
  );
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 修改流通量
 * @param {*} cId
 * @returns
 */
exports.updateSumstock = async function (cId, sumstock) {
  const result = await Collection_sell_manage.update(
    { sumstock },
    {
      where: {
        cId,
      },
    }
  );
  return result;
};
