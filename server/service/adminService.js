const Admin = require("../model/Admin");
const md5 = require("md5");

exports.addAdmin = async function (adminObj) {
  adminObj.pwd = md5(adminObj.pwd);
  const result = await Admin.create(adminObj);
  if (result) {
    return result.toJSON();
  }
  return result;
};

exports.login = async function (adminObj) {
  const result = await Admin.findOne({
    where: {
      account: adminObj.account,
      pwd: md5(adminObj.pwd),
    },
  });
  if (result) {
    return result.toJSON();
  }
  return result;
};

exports.updateAdmin = async function (adminObj) {
  adminObj.pwd = md5(adminObj.pwd);
  const result = await Admin.update(adminObj, {
    where: {
      account: adminObj.account,
    },
  });
  return result;
};
