const User = require("../model/User");
const md5 = require("md5");

/**
 * 添加用户
 * @param {*} userObj
 * @returns
 */
exports.addUser = async function (userObj) {
  userObj.pwd = md5(userObj.pwd);
  const result = await User.create(userObj);
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 通过密码登录
 * @param {*} userObj
 * @returns
 */
exports.loginByPwd = async function (userObj) {
  const result = await User.findOne({
    where: {
      account: userObj.account,
      pwd: md5(userObj.pwd),
    },
  });
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 通过验证码登录
 * @param {*} userObj
 * @returns
 */
exports.loginByVeriCode = async function (account) {
  const result = await User.findOne({
    where: {
      account,
    },
  });
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 修改密码-通过验证码
 * @param {*} userObj
 * @returns
 */
exports.updateUserPwd = async function (userObj) {
  userObj.pwd = md5(userObj.pwd);
  const result = await User.update(
    { pwd: userObj.pwd },
    {
      where: {
        uId: userObj.uId,
        veri_code: userObj.veri_code,
      },
    }
  );
  return result;
};

/**
 * 获取用户信息
 * @param {*} userObj
 * @returns
 */
exports.queryUserInfo = async function (uId) {
  const result = await User.findOne({
    attributes: {
      exclude: [
        "trade_pwd",
        "pwd",
        "higher_level",
        "createdAt",
        "deletedAt",
        "updatedAt",
      ],
    },
    where: {
      uId,
    },
  });
  return result;
};

/**
 * 修改实名状态
 * @param {*} userObj
 * @returns
 */
exports.updateSign = async function (uId) {
  const result = await User.update(
    { isSign: true },
    {
      where: {
        uId: uId,
      },
    }
  );
  return result;
};
