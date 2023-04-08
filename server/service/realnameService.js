const Realname = require("../model/Realname");

/**
 * 实名
 * @param {*} realnameObj
 * @returns
 */
exports.addRealname = async function (realnameObj) {
  const result = await Realname.create(realnameObj);
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 获取实名信息
 * @param {*} uId
 * @returns
 */
exports.queryRealname = async function (uId) {
  const result = await Realname.findOne({
    where: {
      uId,
    },
  });
  if (result) {
    return result.toJSON();
  }
  return result;
};
