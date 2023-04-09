const Points = require("../model/Points");

/**
 * 开通积分钱包
 * @param {*} pointsObj
 * @returns
 */
exports.addPoints = async function (pointsObj) {
  console.log(Points.create);
  const result = await Points.create(pointsObj);
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 获取积分
 * @param {*} uId
 * @returns
 */
exports.queryPoints = async function (uId) {
  const result = await Points.findOne({
    where: {
      uId,
    },
  });
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 添加积分
 * @param {*} uId
 * @param {*} points
 * @param {*} sign_time
 * @returns
 */
exports.updatePoints = async function (uId, points, sign_time) {
  const params = { points };
  if (sign_time) {
    params.sign_time = sign_time;
  }
  const result = await Points.update(params, {
    where: {
      uId,
    },
  });
  return result;
};
