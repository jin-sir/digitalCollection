const Veri_code = require("../model/Veri_code");

const addVeriCode = async function (Obj) {
  const result = await Veri_code.create(Obj);
  if (result) {
    return result.toJSON();
  }
  return result;
};

const updateVeriCode = async function (obj) {
  const result = await Veri_code.update(
    { veri_code: obj.veri_code },
    {
      where: {
        account: obj.account,
      },
    }
  );
  return result;
};

exports.queryVeriCode = async function (account) {
  const result = await Veri_code.findOne({
    where: {
      account,
    },
  });
  if (result) {
    return result.toJSON();
  }
  return result;
};

exports.refreshVeriCode = async function (account, veri_code) {
  const isExist = await exports.queryVeriCode(account);
  if (!isExist) {
    try {
      const res = await addVeriCode({
        account,
        veri_code,
      });
      if (res.account) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  } else {
    const [res] = await updateVeriCode({
      account,
      veri_code,
    });
    if (res === 1) {
      return true;
    }
    return false;
  }
};
